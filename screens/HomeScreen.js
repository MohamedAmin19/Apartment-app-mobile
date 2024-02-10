import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [apartments, setApartments] = useState([]);

  const fetchApartments = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3001/apartments');
      setApartments(response.data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchApartments();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddApartment')}>
        <Text style={styles.addButtonText}>Add Apartment</Text>
      </TouchableOpacity>
      <FlatList
        data={apartments}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ApartmentDetail', { id: item._id })}>
            <Image source={{ uri: item.imageUrls[0] }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007bff', // Example blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center', // Center button horizontally
    marginTop: 10,
    marginBottom: 20, // Add some margin at the top
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },
  addButtonText: {
    color: '#ffffff', // White color for the text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 16,
  },
});

export default HomeScreen;
