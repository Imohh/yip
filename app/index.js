// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Product from '../components/Product';

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState('');
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const addProduct = () => {
    if (products.length >= 5) {
      Alert.alert('Limit Reached', 'You can only add up to 5 products.');
      return;
    }

    setProducts([...products, { name, photo, price }]);
    setName('');
    setPhoto('');
    setPrice('');
  };


  return (
    <View className='flex-1 p-4 bg-gray-100'>
      <TextInput
        className='border p-2 mb-2'
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      {/*<TextInput
        className='border p-2 mb-2'
        placeholder="Product Photo URL"
        value={photo}
        onChangeText={setPhoto}
      />*/}
      <TouchableOpacity onPress={pickImage} className="border p-2 mb-2 bg-white justify-center items-center">
        <Text>{photo ? "Change Photo" : "Upload Photo"}</Text>
      </TouchableOpacity>
      {photo && (
        <Image
          source={{ uri: photo }}
          className='h-40 w-full rounded-lg mb-2'
        />
      )}
      <TextInput
        className='border p-2 mb-2'
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Product" onPress={addProduct} />
      <FlatList
        data={products}
        renderItem={({ item }) => <Product name={item.name} photo={item.photo} price={item.price} />}
        keyExtractor={(item, index) => index.toString()}
        className='mt-4'
      />
    </View>
  );
};

export default App;
