// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Product from '../components/Product';
import logo from "../assets/images/logo.png";

// import { images } from '../constants'

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState('');
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
    <View className='flex-1 p-4 bg-gray-100 mt-10'>
    	<View className="flex items-center justify-center">
    		<Image 
				source={logo}
				className="w-[130px] h-[84px]"
				resizeMode="contain"
			/>
    	</View>

	  <Text className="mb-2 font-semibold capitalize">product name*</Text>
      <TextInput
        className='border border-slate-800 rounded p-4 mb-2 '
        placeholder="Enter product name"
        value={name}
        onChangeText={setName}
      />
      {/*<TextInput
        className='border p-2 mb-2'
        placeholder="Product Photo URL"
        value={photo}
        onChangeText={setPhoto}
      />*/}
	  <Text className="mb-2 font-semibold capitalize">upload image*</Text>
      <TouchableOpacity onPress={pickImage} className="border border-slate-800 rounded p-4 mb-2 bg-white justify-center items-center">
        <Text>{photo ? "Change Photo" : "Upload Photo"}</Text>
      </TouchableOpacity>
      {photo && (
        <Image
          source={{ uri: photo }}
          className='h-40 w-full rounded-lg mb-2'
        />
      )}
	  <Text className="mb-2 font-semibold capitalize">Product price*</Text>
      <TextInput
        className='border border-slate-800 rounded p-4 mb-2'
        placeholder="Enter product price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {/*<Button title="Add Product" onPress={addProduct} />*/}
      <TouchableOpacity className="border rounded mt-2">
      	<Text className="capitalize p-4 bg-black text-white text-center font-semibold" onPress={addProduct}>add product</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={({ item }) => (
        	<>
        		 
       			<View className="w-1/2 p-2">
		        	<Product name={item.name} photo={item.photo} price={item.price} />
		        </View>

			</>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        className='mt-4'
      />
    </View>
  );
};

export default App;
