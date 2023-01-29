import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as ReduxProvider } from 'react-redux';

import Details from './screens/Details';
import Home from './screens/Home';
import store from './store';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<ReduxProvider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="home">
					<Stack.Screen name="home" component={Home} options={{ title: 'Images' }} />
					<Stack.Screen name="details" component={Details} options={{ title: 'Details' }} />
				</Stack.Navigator>
			</NavigationContainer>
		</ReduxProvider>
	);
}
