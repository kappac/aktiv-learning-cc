import { Route } from '@react-navigation/native';
import { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Image } from '../../components/Images';
import useOrientation from '../../hooks/useOrientation';
import { selectImage } from '../../store/images';

import DescriptionRow from './DescriptionRow';

import styles from './styles';

interface RouteParams {
	id: string,
}

interface Props {
	route: Route<string, RouteParams>,
}

const Details: FC<Props> = ({ route: { params: { id } } }) => {
	const { height, width, tags, url, user: { name } } = useSelector(selectImage(id));
	const orientation = useOrientation();

	return (
		<View style={[styles.container, styles[orientation]]}>
			<Image id={id} url={url} height={height} width={width} />
			<View style={styles.container}>
				<DescriptionRow name={'User'} value={name} />
				<DescriptionRow name={'Tags'} value={tags} />
			</View>
		</View>
	);
};

export default Details;                                                               
