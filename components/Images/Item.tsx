import { FC, useCallback } from 'react';
import { Image, ImageStyle, StyleProp, TouchableWithoutFeedback } from 'react-native';

export interface Props {
	style?: StyleProp<ImageStyle>,
	id: string,
	url: string,
	height: number,
	width: number,
	onSelect?: (id: string) => void,
}

const Item: FC<Props> = ({ style, id, url, height, width, onSelect }) => {
	const handleSelect = useCallback(
		() => onSelect?.(id),
		[id, onSelect],
	);

	return (
		<TouchableWithoutFeedback onPress={handleSelect}>
			<Image
				style={[style, { aspectRatio: width / height }]}
				source={{ uri: url }}
				resizeMode="cover"
			/>
		</TouchableWithoutFeedback>
	);
};

export default Item;
