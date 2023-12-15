import { View,Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../commom/colors";

const CustomButton = props => {
    const {onPress, text, width} = props;
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            alignSelf: 'center',
            width: width,
            padding: 10,
            borderRadius: 8,
            backgroundColor: colors.primaryGreen,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
        }}>
            <Text 
            style={{
                fontSize: 22,
                color: colors.white,
                fontFamily: 'Lato-Bold',
            }}>
             {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;