import { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface Props {
	name: string,
	value: string,
}

const DescriptionRow: FC<Props> = ({ name, value }) => (
	<View style={styles.descriptionRowContainer}>
		<Text style={styles.title}>{name}:</Text>
		<Text>{value}</Text>
	</View>
);

export default DescriptionRow;
