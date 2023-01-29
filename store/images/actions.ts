import { createAction } from '@reduxjs/toolkit';

import type { Image } from './reducers';

export interface FetchParams {
	search: string,
	page?: number,
	perPage?: number,
}

export interface FetchFulfilledParams {
	images: ReadonlyArray<Image>,
	total: number,
	page: number,
}

export interface FetchErrorParams {
	code?: number,
	message: string,
}

export const search = createAction<string>('images/search');
export const fetch = createAction<FetchParams>('images/fetch');
export const fetchFulfilled = createAction<FetchFulfilledParams>('images/fetch.fulfilled');
export const fetchRejected = createAction<FetchErrorParams>('images/fetch.rejected');
