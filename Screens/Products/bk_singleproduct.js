import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button, FlatList, TextInput } from 'react-native';
//import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
//import EasyButton from '../../Shared/StyledComponents/EasyButton'
//import TrafficLight from '../../Shared/StyledComponents/TrafficLight'

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {

    console.log("called")
    const [products, setProducts] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("")
    const [comments, setComments] = useState([
        {
          userId: 1,
          userName: 'John Doe',
          comment: 'This is a great comment!',
          rating: 5,
        },
      ]);
      const fetchComments = () => {
        axios
          .get(`${baseURL}products/${productId}/comments/`)
          .then((res) => {
            setComments(res.data);
            setInitialState(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Api call error', error);
          });
      };
    
      useEffect(() => {
        // Fetch comments when the component mounts
        fetchComments();
      }, []);

      const handleAddComment = () => {
       

          const newComment = {
          userId: 2, 
          userName: 'Current User', 
          comment: comments["comment"],
          rating: 0
        };
    
        setComments([...comments, newComment]);
        setComments(''); // Clear the comment input after adding
      };
    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<Text>unavailable</Text>);
            setAvailabilityText("Unvailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<Text>Limited Stock</Text>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<Text>Available</Text>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])
    return (
        <ScrollView>
            <Text>SingleProduct</Text>
            <View>
                <Image
                    source={{
                        uri: item.image ? item.image
                            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>
            
            <View style={styles.contentContainer}>
                <Text style={styles.contentHeader}>{item.name}</Text>
                <Text style={styles.contentText}>{item.brand}</Text>
            </View>
            <View style={styles.availabilityContainer}>
                <View style={styles.availability}>
                    <Text style={{ marginRight: 10 }}>
                        Availability: {availabilityText}
                    </Text>
                    {availability}
                </View>
                <Text>{item.description}</Text>
                <View>
                    <Text style={styles.price}>$ {item.price}</Text>
                </View>
            </View>
            <View>
                <View>
                    {/*
                   <EasyButton 
                   primary
                   medium
                   onPress={() => {props.addItemToCart(item.id),
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${item.name} added to Cart`,
                            text2: "Go to your cart to complete order"
                        })
                }}
                   >
                       <Text style={{ color: 'white'}}>Add</Text>
                   </EasyButton>
            */}
                </View>
            </View>
            <View>
                {console.log(item.comments)}
                <Text style={{paddingTop: 20, position:"relative",fontWeight: 'bold', margin: 12,}}>Comments</Text>
                {
                    item.comments.map((comment,index) => {
                        return (
                            <View style={styles.card}>
                                <Text style={styles.userName}>{comment.userName}</Text>
                                <Text style={styles.comment}>{comment.comment}</Text>
                                <Text style={styles.rating}>Rating: {comment.rating}</Text>
                                <Text style={styles.date}>{comment.date}</Text>
                            </View>
                        )
                    })
                }
            </View>
            {/*
            <FlatList
                data={comments}
                keyExtractor={(comment) => comment.userId.toString()}
                renderItem={({ item }) => (
                <CommentCard
                    userId={item.userId}
                    userName={item.userName}
                    comment={item.comment}
                    rating={item.rating}
                />
                )}
            />
                */}
                <TextInput
                    style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    }}
                    placeholder="Type your comment here"
                    value={comments["comment"]}
                    onChangeText={(text) => setComments(text)}
                />

                <Button
                    title="Add Comment"
                    onPress={handleAddComment}
                />
        </ScrollView >
    )
    /*
    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image 
                        source={{
                            uri: item.image ? item.image 
                            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>$ {item.price}</Text>
                </Left>
                <Right>
                   <EasyButton 
                   primary
                   medium
                   onPress={() => {props.addItemToCart(item.id),
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${item.name} added to Cart`,
                            text2: "Go to your cart to complete order"
                        })
                }}
                   >
                       <Text style={{ color: 'white'}}>Add</Text>
                   </EasyButton>
                </Right>
            </View>
        </Container>
    )
    */

}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comment: {
        marginBottom: 10,
    },
    rating: {
        color: 'green',
    },
    rating: {
        color: 'green',
    },
    date: {
        color: 'blue'
    }
})

export default connect(null, mapToDispatchToProps)(SingleProduct);