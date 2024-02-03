import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions
} from "react-native";
import { Container, Header, Icon, Item, Input, Text, Heading, Center, NativeBaseProvider } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
//import baseUrl from "../../assets/common/baseUrl"
import axios from 'axios';

import ProductList from "./ProductList";
//import SearchedProduct from "./SearchedProducts";
//import Banner from "../../Shared/Banner";
//import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseUrl";

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)

  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
        setActive(-1);
        
        // Products
        axios
          .get(`${baseURL}products`)
          .then((res) => {
            setProducts(res.data);
            setProductsFiltered(res.data);
            setProductsCtg(res.data);
            setInitialState(res.data);
            setLoading(false)
          })
          .catch((error) => {
            console.log('Api call error',error)
          })
    
        // Categories
        axios
          .get(`${baseURL}categories`)
          .then((res) => {
            setCategories(res.data)
          })
          .catch((error) => {
            console.log('Api call error')
          })
    
        return () => {
          setProducts([]);
          setProductsFiltered([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState();
        };
      },
      [],
    )
  ))
    
   
  

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
/*
  return (
    <View>
        <Text>products{console.log(products)}</Text>

    </View>
  )
*/
  return (
    <ScrollView>
    <Center>
      <Container>
      <Icon name="search" />
      <Input
        placeholder="Search"
        onFocus={openList}
        onChangeText={(text) => searchProduct(text)}
      />{focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        {focus == true ? (
      <SearchedProduct 
        navigation={props.navigation}
        productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
          <View>
            
            <View>
              {/*<Banner />*/}
            </View>
            {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
                {productsCtg.map((data,index) => {
                    return(
                        <ProductList
                            navigation={props.navigation}
                            key={index}
                            item={data}
                        />
                    )
                })}
            </View>
            ) : (
                <View style={[styles.center, { height: height / 2}]}>
                    <Text>No products found</Text>
                </View>
            )}
            
          </View>
        </ScrollView> )}
      </Container>
      
   </Center>
   </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default ProductContainer;


 {/*
  <Text>hello</Text>
   <Item>
     <Icon name="ios-search" />
     <Input
       placeholder="Search"
       onFocus={openList}
       onChangeText={(text) => searchProduct(text)}
     />
     {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
    </Item>

 {focus == true ? (
   <SearchedProduct 
   navigation={props.navigation}
   productsFiltered={productsFiltered} />
 ) : (
   <ScrollView>
     <View>
       <View>
         <Banner />
       </View>
       <View>
         <CategoryFilter
           categories={categories}
           categoryFilter={changeCtg}
           productsCtg={productsCtg}
           active={active}
           setActive={setActive}
         />
       </View>
       {productsCtg.length > 0 ? (
       <View style={styles.listContainer}>
           {productsCtg.map((item) => {
               return(
                   <ProductList
                       navigation={props.navigation}
                       key={item.name}
                       item={item}
                   />
               )
           })}
       </View>
       ) : (
           <View style={[styles.center, { height: height / 2}]}>
               <Text>No products found</Text>
           </View>
       )}
      
     </View>
   </ScrollView>
       )}*/}