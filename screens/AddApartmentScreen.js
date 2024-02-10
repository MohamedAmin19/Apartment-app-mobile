import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AddApartmentScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    imageUrls: null,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('ImagePicker Result:', result);
  
    if (!result.cancelled) {
      handleChange('imageUrls', result.assets[0].uri);
    }
  };
  

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'imageUrls' && value) {
        data.append('images', {
          uri: value,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
      } else {
        data.append(key, value);
      }
    });
  
    try {
      const response = await axios.post('http://10.0.2.2:3001/apartments', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Apartment added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding apartment:', error);
      Alert.alert('Error', 'Could not add the apartment');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('title', text)}
        value={formData.title}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('location', text)}
        value={formData.location}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('price', text)}
        keyboardType="numeric"
        value={formData.price}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('description', text)}
        value={formData.description}
      />
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Add Apartment" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AddApartmentScreen;
