import { View, Text , TouchableOpacity, Image, StyleSheet, ScrollView} from "react-native";
import React from 'react';
import { useDimensionContext } from "../../context";
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { signout } from "../../store/actions";
import colors from "../../commom/colors";
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function CustomDrawer() {
    // const dimensions = useDimensionContext();
    // const responsiveStyle = style()

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signout());
    };

    const contents = [
        {
            itemId: 0,
            itemName: 'Home',
            navigation: 'Home',
            icon: () => {
                return (
                <Image 
                style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginRight: 10,
                }}
            source={require('../../assets/images/home.png')}
            />
                );
            },
        },
        {
            itemId: 1,
            itemName: 'Products',
            navigation: 'Products',
            icon: () => {
                return (
                    <Feather
                    style={{marginRight: 10}}
                    name="shopping-bag"
                    size={25}
                    color={colors.black_level_2}
                  />
                );
            },
        },
        {
            itemId: 2,
            itemName: 'Categories',
            navigation: 'Footer',
            icon: () => {
                return (
                    <MaterialIcons
                    style={{marginRight: 10}}
                    name="category"
                    size={25}
                    color={colors.black_level_2}
                  />
                );
            },
        },
        {
            itemId: 3,
            itemName: 'Orders',
            navigation: 'Orders',
            icon: () => {
                return (
                <Image 
                style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginRight: 10,
                }}
            source={require('../../assets/images/orders.png')}
            />
                );
            },
        },
        {
            itemId: 4,
            itemName: 'Reviews',
            navigation: 'Footer',
            icon: () => {
                return (
                    <MaterialIcons
                    style={{marginRight: 10}}
                    name="reviews"
                    size={25}
                    color={colors.black_level_2}
                  />
                );
            },
        },
        {
            itemId: 5,
            itemName: 'Banners',
            navigation: 'Banner',
            icon: () => {
                return (
                    <Feather
                    style={{marginRight: 10}}
                    name="sliders"
                    size={25}
                    color={colors.black_level_2}
                  />
                );
            },
        },
        {
            itemId: 6,
            itemName: 'Offers',
            navigation: 'Offers',
            icon: () => {
                return (
                    <MaterialIcons
                    style={{marginRight: 10}}
                    name="local-offer"
                    size={25}
                    color={colors.black_level_2}
                  />
                );
            },
        },
        {
            itemId: 7,
            itemName: 'Logout',
            onPress: handleSignOut,
            icon: () => {
                return (
                    <AntDesign
                    style={{marginRight: 10}}
                    name="logout"
                    size={25}
                    color={colors.black_level_2}
                  />
                );
            },
        },
    ];

    const handleTouch = itemData => {
        if (itemData.navigation) {
            navigation.navigate(itemData.navigation);
        } else {
            itemData.onPress();
        }
    };
    return (
        <ScrollView style={{flex: 1}}>
            <View style={{
                padding: 10, 
             //   marginTop:20,
                borderBottomWidth: StyleSheet.hairlineWidth,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                }}>
                    <View
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 75/2,
                        backgroundColor: colors.primaryGreen,
                    }}>
                    </View>
                <View style={{padding: 25}}>
              <Text
              style={{
                fontFamily: 'Lato-Black',
                fontSize: 18,
                color: colors.black_level_3,
              }}>
                Admin
                </Text>
              <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 16,
                color: colors.black_level_3,
              }}>
                admin@yopmail.com
                </Text>
            </View>
            </View>
            <View style={{marginTop: 10}}>
            {contents.map((item, index) => {
                return (
                <TouchableOpacity
                onPress={() => handleTouch(item) }
                key={String (item.itemId)}
                style={{
                    padding: 10, 
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>
                        <View 
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                           {item.icon()}
                    <Text
                    style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 16,
                        color: colors.black_level_3,
                    }}>
                        {item.itemName}
                        </Text>
                    </View>
                    <Image 
                    style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                    }}
                    source={require('../../assets/images/arrow-right.png')} />
                </TouchableOpacity>
                );
            })}
             </View>
             <View style={{marginVertical: 55}}>
             <Image 
             source={require('../../assets/images/logo.jpeg')}
             style={{
                width: 130,
                height: 50,
                resizeMode: 'contain',
                alignSelf: 'center',
            }}
             />
             <Text
                style={{
                fontFamily: 'Lato-Regular',
                fontSize: 16,
                color: colors.black_level_3,
                textAlign: 'center',
                }}>
                All rights reserved
            </Text>
            </View>
        </ScrollView>
    );
}