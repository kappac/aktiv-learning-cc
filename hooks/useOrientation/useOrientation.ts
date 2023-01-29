import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export enum Orientation {
	Portrait = 'PORTRAIT',
	Landscape = 'LANDSCAPE',
}

const useOrientation = (): Orientation => {
	const { height, width } = useWindowDimensions();
	const orientation = useMemo(
		() => height >= width ? Orientation.Portrait : Orientation.Landscape,
		[height, width],
	);

	return orientation;
}

export default useOrientation;
