import {View, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import colors from '../../commom/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const CustomeTabBar = () => {
    const navigation = useNavigation();
    const [active, setActive] = useState('Home');
    const activeSize = 36;
    const activeFamily = 'Lato-Bold';

    const handleNavigation = name => {
        setActive(name);
        navigation.navigate(name);
    };

    return (
        <View 
        style={{
            height: 75,
            backgroundColor: colors.primaryGreen,
            padding: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <AntDesign 
            style={{alignSelf: 'center', marginBottom: 4}}
            name="home" 
            size={active === 'Home' ? activeSize : 30} 
            color={colors.white} />
            <Text 
            style={{
                fontSize: 16, 
                color: colors.white, 
                fontFamily: active === 'Home' ? activeFamily : 'Lato-Regular',
                }}>
            Home
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Products')}>
            <AntDesign 
            style={{alignSelf: 'center', marginBottom: 4}}
            name="inbox" 
            size={30} 
            color={colors.white} />
            <Text 
            style={{
                fontSize: 16, 
                color: colors.white, 
                fontFamily: active === 'Products' ? activeFamily : 'Lato-Regular',
                }}>
            Products
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Orders')}>
        <AntDesign 
            style={{alignSelf: 'center', marginBottom: 4}}
            name="database" 
            size={30} 
            color={colors.white} />
            <Text
             style={{
                fontSize: 16, 
                color: colors.white, 
                fontFamily: active === 'Orders' ? activeFamily : 'Lato-Regular',
                }}>
            Orders
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <AntDesign 
            style={{alignSelf: 'center', marginBottom: 4}}
            name="user" 
            size={30} 
            color={colors.white} />
            <Text 
            style={{
                fontSize: 16, 
                color: colors.white, 
                fontFamily: active === 'Profile' ? activeFamily : 'Lato-Regular',
                }}>
            Profile
            </Text>
        </TouchableOpacity>
        </View>
    );
};

export default CustomeTabBar;