import Icons from '@expo/vector-icons/Feather';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
	onPress?: () => void,
}

const SearchButton: FC<Props> = ({ onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<Icons name="search" size={24} color="black" />
	</TouchableOpacity>
);

export default SearchButton;
