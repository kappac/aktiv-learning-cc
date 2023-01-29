import { FC, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import type { Image } from '../../store/images';
import type { Props as ItemProps } from './Item';
import Item from './Item';

import styles from './styles';

interface Props extends Pick<ItemProps, 'onSelect'> {
	columns?: number,
	list?: ReadonlyArray<Image>,
	onLoad?: () => void,
}

const loadWatermark = .5;
const defaultColumns = 1;
const defaultList = [];

const Images: FC<Props> = ({ columns = defaultColumns, list = defaultList, onLoad, onSelect }) => {
	const renderItem = useCallback(({ item: { id, height, width, url }, index }) => (
		<Item
			style={
				columns === 1
					? styles.itemVertical
					: [styles.itemHorizontal, !(index % 2) && styles.itemHorizontalEven]
			}
			id={id}
			url={url}
			height={height}
			width={width}
			onSelect={onSelect}
		/>
	), [columns, onSelect]);

	return (
		<SafeAreaView>
			<FlatList
				key={columns}
				numColumns={columns}
				data={list}
				renderItem={renderItem}
				keyExtractor={({ id }) => id}
				ItemSeparatorComponent={<View style={{ height: 8 }} />}
				onEndReachedThreshold={loadWatermark}
				onEndReached={onLoad}

			/>
		</SafeAreaView>
	);
};

export default Images;
