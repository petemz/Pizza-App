import products from '@/assets/data/products';
import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const sizes = [ "S", "M", "L", "XL" ]

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()

  const [selectedSize, setSelectedSize] = useState("M")

  const product = products.find(p => p.id.toString() === id)

  const addToCart = () => {
    console.warn("Adding to cart, size: " + selectedSize)
  }

  if(!product) {
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image style={styles.image} source={{ uri: product.image || defaultPizzaImage }} />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map(size => {
          return(
            <Pressable
              onPress={() => setSelectedSize(size)}
              style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : ""}]} 
              key={size}>
              <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : "gray"}]}>{size}</Text>              
            </Pressable>
          )}
        )}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to Cart' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto"
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center"
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
})

export default ProductDetailsScreen