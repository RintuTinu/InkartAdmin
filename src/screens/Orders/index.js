import {View, Text, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import React, {useState, useCallback, useLayoutEffect} from 'react';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import colors from '../../commom/colors';
import CustomTextinput from '../../components/CustomTextinput';
import EmptyData from '../../commom/EmptyData';
import NavigationBack from '../../commom/NavigationBack';


const Orders = () => {
  const [searchText, setSearchText] = useState('');
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);
  
  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Products found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            console.log(document);
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const Header = () => (
    <CustomTextinput
      width={'95%'}
      border={true}
      value={searchText}
      placeholder={'Search Here.'}
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
      .collection('Orders')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const dateFormat = time => {
    return moment(new Date(time)).format('DD/MM/YYYY HH:mm');
  };

  return (
    <FlatList
      style={{flex: 1, padding: 15}}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      data={orders}
      extraData={orders}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails', {order: item})}
          style={{
            backgroundColor: '#f0f8ff',
            borderRadius: 15,
            padding: 12,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.black,
                  fontSize: 15,
                }}>
                ID: #{item.orderId}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.primaryGreen,
                  fontSize: 13,
                }}>
                Ordered On: {dateFormat(item?.created)}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.placeholder,
                  fontSize: 14,
                  width: width * 0.6,
                }}
                numberOfLines={3}>
                {item.address ??
                  'HA, Restro Caps Villa, 894, 78634, USA, LATGYIN'}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.black,
                  fontSize: 16,
                }}>
                Paid:{' '}
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: colors.primaryGreen,
                  }}>
                  ₹{item?.totalAmount}
                </Text>
                , Items:{' '}
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: colors.primaryGreen,
                  }}>
                  {item?.cartItems}
                </Text>
              </Text>
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 15,
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.2,
                  height: width * 0.2,
                  resizeMode: 'stretch',
                }}
                source={require('../../assets/images/map.webp')}
              />
            </View>
          </View>
          <View
            style={{
              paddingTop: 15,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: colors.borderGrey,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                color: colors.black,
                fontSize: 13,
              }}>
              {item.orderStatus}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                color: colors.placeholder,
                fontSize: 13,
              }}>
              Rate & Review Product
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
export default Orders;
