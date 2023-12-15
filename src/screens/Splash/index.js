import {View, Text, Image} from 'react-native';
import React from 'react';

export default function Splash() {
    return (
        <View style={{flex: 1}}>
      <Image 
        source={require('../../assets/images/splash.jpg')}
        style={{
            width: '100%', 
            height: '100%',
            resizeMode: 'cover',
            alignSelf: 'center',
        }}
        />
        </View>
    );
}