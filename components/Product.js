// src/components/Product.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import tw from 'nativewind';

const Product = ({ name, photo, price }) => {
  return (
    <View className='bg-white p-4 rounded-lg shadow-md mb-4'>
      <Image source={{ uri: photo }} className='h-40 w-full rounded-lg' />
      <Text className='mt-2 text-lg font-bold'>{name}</Text>
      <Text className='mt-1 text-gray-600'>${price}</Text>
    </View>
  );
};

export default Product;
