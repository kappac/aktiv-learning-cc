import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		display: 'none',
		position: 'absolute',
		padding: 8,
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
		zIndex: 1,
	},
	show: {
		display: 'flex',
	},
	input: {
		height: 40,
		padding: 10,
		borderWidth: 1,
		borderRadius: 8,
	},
});

export default styles;
