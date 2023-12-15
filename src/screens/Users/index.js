import { View, Text, FlatList, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../commom/colors';
import NavigationBack from '../../commom/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import CustomTextinput from '../../components/CustomTextinput';
import EmptyData from '../../commom/EmptyData';

const Users = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]); 
    const [searchText, setSearchText] = useState('');
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Users',
            headerStyle: {
                backgroundColor: colors.white,
                height: 70,
            },
            headerTitleStyle: {
                fontFamily: 'Lato-Bold',
                fontSize: 25,
                color: colors.black_level_3,
            },
            headerTintColor: colors.black_level_3,
            headerLeft: () => <NavigationBack />
        });
    }, [navigation]);
    
    useFocusEffect(
        useCallback(() => {
            getUsers();
        }, []),
    );
    const getUsers = async () => {
          await firestore()
          .collection('Users')
          .get()
          .then(snapshort => {
            if (snapshort.empty) {
                Snackbar.show({
                    text: 'No users found',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:colors.red,
                    textColor: colors.white,
                  });
            } else {
                const objArray = [];
                snapshort?.docs.forEach(document => {
                    const result = {id: document.id, ...document?.data()};
                    objArray.push(result);
                });
                setUsers(objArray);
            }
          });
    };

     const Header = () => (
            <CustomTextinput 
          width={'95%'} 
          border={true}
          value={searchText}
          placeholder={'Search here'} 
          onChangeText={text => handleSearch(text)}
          icon={
            <Image 
                source={require('../../assets/images/search.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          }
          />
        );

        const handleSearch = async text => {
            setSearchText(text);
            await firestore()
            .collection('Users')
            .orderBy('username')
            .startAt(text)
            .endAt(text + '\uf8ff')
            .get()
            .then(snapshort => {
                if(snapshort.empty){
                    Snackbar.show({
                        text: 'No results found',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor:colors.red,
                        textColor: colors.white,
                      });
                    setUsers([]);
                } else {
                    const objArray = [];
                    snapshort?.docs.forEach(document => {
                        const result = {id: document.id, ...document?.data()};
                        objArray.push(result);
                    });
                    setUsers(objArray);
                }
            });
        };

     const BlockUser = ({data}) => {
        return (
     <TouchableOpacity 
     onPress={() => handleBlockUser(data)}
     style={{
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 4,
        borderRadius: 8,
        borderColor: data?.active ? colors.red : colors.primaryGreen,
        borderWidth: 1,
     }}>
        <Text
        style={{
            fontFamily: 'Lato-Bold',
            fontSize: 16,
            color: data?.active ? colors.red : colors.primaryGreen,
        }}>
        {data?.active ? 'Block' : 'Unblock'}
        </Text>
     </TouchableOpacity>
     );
    };

     const handleBlockUser = async (data) => {
        try {
            await firestore()
            .collection('Users')
            .doc(data.id)
            .update({
                active: data?.active ? false : true,
            })
            .then(() => {
              const updated_users = users.map(obj => {
                if (obj.id === data?.id) {
                    obj.active = data?.active ? false : true;
                }
                return obj;
              });
              Snackbar.show({
                text: 'User Updated Successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor:colors.primaryGreen,
                textColor: colors.white,
              });
              setUsers(updated_users);
            });
        } catch (error) {
            console.warn(error);
        }
     };

    return (
        <FlatList 
        style={{flex: 1, padding: 15}}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        data={users}
        extraData={users}
        ListHeaderComponent={() => <Header />}
        ListEmptyComponent={() => <EmptyData />}
        renderItem={({item, index}) => {
            if(item.username === 'admin'){
                return null
            } else {
                return (
                    <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 8,
                        borderRadius: 15,
                        padding: 10,
                        width: '95%',
                        backgroundColor: colors.lightGery,
                        alignSelf: 'center',
                    }}>
                        <Image 
                        source={
                            item?.profileimage 
                            ? {uri: item?.profileimage}
                            : require('../../assets/images/user.png')
                        } 
                        style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain',
                            borderRadius: 40,
                            overflow: 'hidden',
                        }}
                        />
                        <View style={{marginLeft: 10}}>
                        <Text 
                        style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 20,
                            color: colors.black_level_3,
                            lineHeight: 35,
                        }}>
                        {item?.username}
                        </Text>
                        <Text 
                        style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 16,
                            color: colors.category4,
                        }}>
                        {item?.email}
                        </Text>
                        <Text 
                        style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 16,
                            color: colors.black_level_3,
                        }}>
                        {item?.mobilenumber}
                        </Text>
                        </View>
                        <BlockUser data={item} />
                    </View>
            );
            }
           
        }}
        />
    );
};

export default Users;