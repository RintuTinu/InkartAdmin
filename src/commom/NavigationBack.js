import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";

export default function NavigationBack() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
            source={require('../assets/images/left-arrow.png')}
            style={{
                width: 30, 
                height: 30, 
                resizeMode: 'contain', 
                marginRight:10
            }} 
            />
            </TouchableOpacity>
    );
};