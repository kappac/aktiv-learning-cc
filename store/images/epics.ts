import type { PayloadAction } from '@reduxjs/toolkit';
import { combineEpics, Epic } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import {
	catchError,
	concatMap,
	debounceTime,
	filter,
	map,
	mergeMap,
	withLatestFrom
} from 'rxjs/operators';

import type { AppState } from '../types';
import { fetch, fetchFulfilled, fetchRejected, search } from './actions';

const fetchDebounceTime = 300;

const searchEpic: Epic<PayloadAction, PayloadAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(search.match),
		debounceTime(fetchDebounceTime),
		withLatestFrom(state$),
		concatMap(([{ payload }, { images: { amount, page, total } }]) => {
			if (amount < total || !page) {
				return of(fetch({
					search: payload,
					page: page + 1,
				}));
			}

			return EMPTY;
		}),
	);


const fetchEpic: Epic<PayloadAction, PayloadAction, AppState> = (action$, _state$, { get }) =>
	action$.pipe(
		filter(fetch.match),
		mergeMap(({ payload: { search, page, perPage } }) =>
			get(search, page, perPage).pipe(
				map(({ total, hits }: any) => fetchFulfilled({
					total,
					page,
					images: hits.map(
						({ id, previewURL, previewWidth, previewHeight, user_id, user, tags }) => ({
							user: {
								id: user_id,
								name: user,
							},
							id,
							tags,
							url: previewURL,
							resolution: `${previewWidth}x${previewHeight}`,
							height: previewHeight,
							width: previewWidth,
						}),
					),
				})),
				catchError(error => of(fetchRejected({
					code: error.status,
					message: error.response,
				}))),
			),
		),
	);

export const imagesEpic = combineEpics(fetchEpic, searchEpic);
