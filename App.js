import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Home from './screens/Home';
import SearchScreen from './screens/SearchScreen';
import Favorite from './screens/Favorite';
import PokemonDetail from './screens/PokemonDetail';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Favorites" component={Favorite} />
      <Stack.Screen name="Detail" component={PokemonDetail} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
