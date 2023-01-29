import type { PayloadAction, Reducer } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

import { fetchFulfilled, FetchFulfilledParams, search } from './actions';

interface User {
	id: number,
	name: string
}

export interface Image {
	id: string,
	user: User,
	url: string,
	resolution: string,
	height: number,
	width: number,
	tags: string,
}


export interface ImagesState {
	list: Record<number, Image>,
	amount: number,
	total: number,
	page: number,
	search: string,
}

export const getImagesEmptyState = (search: string = ''): ImagesState => ({
	search,
	list: [],
	amount: 0,
	total: 0,
	page: 0,
});

const fulfilledReducer: Reducer<ImagesState, PayloadAction<FetchFulfilledParams>> = (
	state,
	{ payload: { images, total, page } },
) => {
	const newState: ImagesState = {
		...state,
		total,
		page,
	};

	if (page === 1) {
		newState.list = {};
	} else {
		newState.list = { ...state.list };
	}

	images.forEach(image => newState.list[image.id] = image);

	newState.amount = Object.values(newState.list).length;

	return newState;
};

const searchReducer: Reducer<ImagesState, PayloadAction<string>> = (state, { payload }) => {
	if (state.search === payload) {
		return state;
	}

	return getImagesEmptyState(payload);
};

export const imagesReducer = createReducer<ImagesState>(
	getImagesEmptyState(),
	builder => {
		builder
			.addCase(search, searchReducer)
			.addCase(fetchFulfilled, fulfilledReducer);
	},
);
