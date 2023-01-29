import { createSelector } from '@reduxjs/toolkit';

import type { AppState } from '../types';
import type { ImagesState } from './reducers';

const selectSelf = (state: AppState): ImagesState => state.images;

export const selectSearch = createSelector(
	selectSelf,
	({ search }) => search,
);

export const selectImage = (id: string) => createSelector(
	selectSelf,
	({ list }) => list[id],
);

export const selectImages = createSelector(
	selectSelf,
	({ list }) => Object.values(list),
);

export const selectImagesHasMore = createSelector(
	selectSelf,
	({ amount, total }) => amount < total,
);
