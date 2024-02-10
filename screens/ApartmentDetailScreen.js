import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute from react-navigation/native

const ApartmentDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute hook to access route parameters
  const [apartment, setApartment] = useState(null);
  const apartmentId = route.params?.id; // Get the id passed via navigation parameters

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3001/apartments/${apartmentId}`);
        setApartment(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch apartment details');
        console.error(error);
      }
    };

    fetchApartmentDetails();
  }, [apartmentId]);

  if (!apartment) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{apartment.title}</Text>
      <Image source={{ uri: apartment.imageUrls[0] }} style={styles.image} />
      <Text style={styles.description}>{apartment.location}</Text>
      <Text style={styles.description}>{apartment.description}</Text>
      <Text style={styles.price}>${apartment.price}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Apartments</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      backgroundColor: '#f9f9f9',
    },
    title: {
      fontSize: 24,
      fontWeight: '500',
      color: '#333',
      marginBottom: 15,
    },
    image: {
      width: '100%',
      height: 300, // Static height, adjust as needed
      borderRadius: 6,
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      lineHeight: 24, // Approximation of line-height: 1.6 in React Native
      color: '#666',
      marginBottom: 10,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007BFF',
      paddingVertical: 10,
      paddingHorizontal: 0, // No horizontal padding needed for inline-block style
      backgroundColor: '#ffffff',
      borderRadius: 5,
      marginBottom: 20, // Add some margin bottom for spacing
    },
    backButton: {
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 5,
      alignSelf: 'flex-start', // Align button to the start (left)
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
      elevation: 5,
    },
    backButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });  

export default ApartmentDetailScreen;
