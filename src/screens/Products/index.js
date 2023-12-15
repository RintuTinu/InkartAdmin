import { View, Text, Image,FlatList, TouchableOpacity, Dimensions, Alert} from 'react-native';
import React, {useCallback, useState, useLayoutEffect} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../commom/colors';
import EmptyData from '../../commom/EmptyData';
import CustomTextinput from '../../components/CustomTextinput';
import NavigationBack from '../../commom/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'


const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const {width, height} = Dimensions.get('screen');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Products',
            headerLeft: () => <NavigationBack />,
            headerRight: () => <RightComponent/>
        });
    }, [navigation]);

    const RightComponent = () => {
        return (
          <TouchableOpacity
           onPress={() =>  navigation.navigate('CreateProduct', {type: 'create'})}>
          <AntDesign
            style={{marginRight: 4}}
              name="plussquareo"
              size={30}
              color={colors.black_level_2}
              />
          </TouchableOpacity>
        );
       };

    useFocusEffect(
        useCallback(() => {
            getProducts();
        }, []),
    );
    
    const getProducts = async () => {
          await firestore()
          .collection('Products')
          .get()
          .then(snapshort => {
            if (snapshort.empty) {
                Snackbar.show({
                    text: 'No products found',
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
                setProducts(objArray);
            }
          });
    };

    const Header = () => (
        <CustomTextinput
      width={'100%'} 
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
        .collection('Products')
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
                setProducts([]);
            } else {
                const objArray = [];
                snapshort?.docs.forEach(document => {
                    const result = {id: document.id, ...document?.data()};
                    objArray.push(result);
                });
                setProducts(objArray);
            }
        });
    };

const handleDelete =  async productData => {
    Alert.alert
    ('Confirm Product Deletion', 
    'Do you want to delete this product, deleting the product will lose the product data', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'Delete', 
        onPress: async () => { 
        await firestore()
        .collection('Products')
        .doc(productData.id)
        .delete()
        .then(() => {
          Snackbar.show({
            text: 'Product Deleted successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor:colors.primaryGreen,
            textColor: colors.white,
          });
        });
        getProducts(); }},
    ]);
    
};

const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
};

    return (
        <FlatList 
        style={{flex: 1, padding: 15,}}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        data={products}
        numColumns={2}
        extraData={products}
        ListHeaderComponent={() => <Header />}
        ListEmptyComponent={() => <EmptyData />}
        renderItem={({item, index}) => {
            if(item.username === 'admin'){
                return null
            } else {
                return (
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('ProductDetails', {product: item})}
                    style={{
                        marginLeft: index % 2 === 1 ? 15 : 0,
                        marginVertical: 8,
                        borderRadius: 15,
                        width: '48%',
                        height: height * 0.32,
                       borderColor: colors.primaryGreen,
                       borderWidth: 1,
                        alignSelf: 'center',
                        overflow: 'hidden',
                    }}>
                        <View
                        style={{
                            position: 'absolute', 
                            top: 10, 
                            right: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            }}>
                        <Feather 
                        onPress={() => handleEdit(item)}
                        name="edit" 
                        size={25} 
                        color={colors.black_level_2} 
                        />
                        <AntDesign
                        onPress={() => handleDelete(item)}
                         name="delete" 
                         size={25} 
                         color={colors.black_level_2}
                         style={{marginLeft: 10}}
                          />
                        </View>
                        <View 
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                          //  backgroundColor: colors.white,
                            width: '95%',
                            height: height * 0.15,
                            borderRadius: 15,
                            marginVertical: 5,
                            marginTop: 30,
                        }}>
                        <Image 
                        source={
                            item?.image 
                            ? {uri: item?.image}
                            : require('../../assets/images/user.png')
                        } 
                        style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain',
                            overflow: 'hidden',
                        }}
                        />
                        </View>
                        <View style={{marginLeft: 10, overflow: 'hidden', width: '75%'}}>
                        <Text 
                        numberOfLines={1}
                        style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 20,
                            color: colors.primaryGreen,
                            lineHeight: 35,
                        }}>
                        {item?.name}
                        </Text>
                        <Text 
                        numberOfLines={2}
                        style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 16,
                            color: colors.black_level_2,
                        }}>
                        {item?.description}
                        </Text>
                        <Text 
                        style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 18,
                            color: colors.black_level_3,
                            lineHeight: 35,
                        }}>
                        ₹{item?.price}
                        </Text>
                        </View>
                    </TouchableOpacity>
            );
            }
           
        }}
        />
    );
};

export default Products;