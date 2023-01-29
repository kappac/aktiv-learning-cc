import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { getImagesEmptyState, imagesEpic, imagesReducer } from './images';
import get from './request';
import type { AppState } from './types';

const defaultState: AppState = {
	images: getImagesEmptyState(),
};

const epic = combineEpics(imagesEpic);

const reducer = combineReducers({
	images: imagesReducer,
});

const epicMiddleware = createEpicMiddleware({ dependencies: { get } });

export default function configure() {
	const store = configureStore({
		reducer,
		preloadedState: defaultState,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware),
		devTools: process.env.NODE_ENV !== 'production',
	});

	epicMiddleware.run(epic);

	return store;
}
