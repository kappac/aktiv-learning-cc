import { FC, useEffect } from 'react';
import { View } from 'react-native';

import Images from '../../components/Images';
import SearchBox from '../../components/SearchBox';
import SearchButton from '../../components/SearchButton';

import { useHome, UseHomeProps } from './useHome';

import styles from './styles';

interface Props extends Pick<UseHomeProps, 'navigation'> { }

const Home: FC<Props> = ({ navigation }) => {
	const {
		columns,
		images,
		query,
		showSearch,
		handleImageSelect,
		toggleSearchBox,
		searchImages,
		handleLoad,
	} = useHome({ navigation });

	useEffect(
		() => {
			navigation.setOptions({
				headerRight: () => (
					<SearchButton onPress={toggleSearchBox} />
				)
			});
		},
		[navigation],
	);

	return (
		<View style={styles.container}>
			<SearchBox show={showSearch} value={query} onChange={searchImages} />
			<Images
				columns={columns}
				list={images}
				onSelect={handleImageSelect}
				onLoad={handleLoad}
			/>
		</View>
	);
};

export default Home;
