import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './components/Navigation/StackNavigation';
import ListProduct from './components/ListProduct/ListProduct';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './components/public/Redux/store';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreLogs(['Remote debugger']);
// Ignore all log notifications:
LogBox.ignoreAllLogs();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}
