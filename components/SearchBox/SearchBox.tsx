import { FC } from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';

interface Props {
	show?: boolean,
	value: string,
	onChange?: (v: string) => void,
}

const SearchBox: FC<Props> = ({ show, value, onChange }) => (
	<View style={[styles.container, show && styles.show]}>
		<TextInput style={styles.input} value={value} onChangeText={onChange} />
	</View>
);

export default SearchBox;
