import { View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../commom/colors';

const Profile = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profile',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
            source={require('../../assets/images/left-arrow.png')}
            style={{
                width: 30, 
                height: 30, 
                resizeMode: 'contain', 
                marginRight:10
            }} 
            />
            </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
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
    );
};

export default Profile;