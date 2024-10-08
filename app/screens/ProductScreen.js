// src/screens/ProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import Product from '../../components/Product'; // Ensure correct path

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [price, setPrice] = useState('');

  const addProduct = () => {


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
      <TextInput
        className='border p-2 mb-2'
        placeholder="Product Photo URL"
        value={photo}
        onChangeText={setPhoto}
      />
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

export default ProductScreen;
