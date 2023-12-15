import {View, Text} from 'react-native';
import React from 'react';
import colors from './colors';

export default function EmptyData() {
    return (
        <View 
        style={{
            marginVertical: 8,
                borderRadius: 15,
                padding: 10,
                width: '95%',
                backgroundColor: colors.lightGery,
                alignSelf: 'center',
        }}>
           <Text
           style={{
            fontFamily: 'Lato-Bold',
            fontSize: 20,
            color: colors.black_level_3,
            lineHeight: 35,
           }}>
            No Results Found
            </Text>
        </View>
    );
};
