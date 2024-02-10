import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddApartmentScreen from '../screens/AddApartmentScreen';
import ApartmentDetailScreen from '../screens/ApartmentDetailScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddApartment" component={AddApartmentScreen} title="Add Apartment" />
      <Stack.Screen name="ApartmentDetail" component={ApartmentDetailScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
