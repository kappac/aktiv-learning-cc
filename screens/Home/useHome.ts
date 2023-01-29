import { NavigationAction } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useOrientation, { Orientation } from '../../hooks/useOrientation';
import { search, selectImages, selectImagesHasMore, selectSearch } from '../../store/images';

export interface UseHomeProps {
	navigation: NavigationAction
}

export const useHome = ({ navigation }) => {
	const dispatch = useDispatch();
	const orientation = useOrientation();
	const hasMore = useSelector(selectImagesHasMore);
	const images = useSelector(selectImages);
	const query = useSelector(selectSearch);
	const [showSearch, setShowSearch] = useState(false);
	const searchImages = useCallback(
		(query = '') => dispatch(search(query)),
		[dispatch],
	);
	const handleImageSelect = useCallback(
		(id: string) => navigation.navigate('details', { id }),
		[navigation],
	);
	const toggleSearchBox = useCallback(
		() => setShowSearch(p => !p),
		[],
	);
	const handleLoad = useCallback(
		() => searchImages(query),
		[query, searchImages],
	);

	useEffect(() => { searchImages(); }, [searchImages]);

	return {
		hasMore,
		query,
		showSearch,
		images,
		columns: orientation === Orientation.Portrait ? 1 : 2,
		handleImageSelect,
		toggleSearchBox,
		searchImages,
		handleLoad,
	};
};
