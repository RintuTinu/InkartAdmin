import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {useDimensionContext} from '../../context';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomDropDown from '../../components/CustomDropDown';
import NavigationBack from '../../commom/NavigationBack';
import colors from '../../commom/colors';
import CustomButton from '../../components/customButton';

const OrderDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [status, setStatus] = useState('');
  const route = useRoute();
  const order = route.params.order;
  const {item} = route.params;
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (order) {
      setOrderStatus(order?.orderStatus);
    }
  }, [order]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order Details',
      headerStyle: {
        backgroundColor: colors.white,
        height: 70,
      },
      headerTintColor: '#000',
      headerLeft: () => <NavigationBack />,
      //headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const reOrder = async () => {
    try {
      setLoading(true);
      const smallId = Math.random();
      await firestore()
        .collection('Orders')
        .add({
          orderId: String(smallId).slice(4, 12).toUpperCase(),
          created: Date.now(),
          updated: Date.now(),
          orderStatus: 'Ordered',
          totalAmount: item.totalAmount,
          address: item.address,
          userId: item.userId,
          paymentMethod: 'online',
          cartItems: item.cartItems,
          userName: item.userName,
          userPhone: item.userPhone,
          expDelDate: '',
        })
        .then(async res => {
          console.warn(res);
          setTimeout(() => {
            Snackbar.show({
              text: 'Your order is successfully placed..',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.primaryGreen,
              textColor: colors.white,
            });
            setLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error, 'Error');
    }
  };

  // const RightComponent = () => {
  //   return (
  //     <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
  //       <FontAwesome
  //         name="edit"
  //         size={30}
  //         style={{marginRight: 4}}
  //         color={colors.black}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  const handleUpdateOrder = async () => {
    try {
      if (order?.id && status !== '') {
        await firestore()
          .collection('Orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);
            setTimeout(() => {
              Snackbar.show({
                text: 'Order status is updated',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.pg,
                textColor: colors.white,
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const statusData = [
    {name: 'Ordered'},
    {name: 'Order Inprogress'},
    {name: 'Order Packed'},
    {name: 'Order shipped'},
    {name: 'Out of delivery'},
    {name: 'Delivered'},
    {name: 'Returned'},
    {name: 'Failed'},
  ];
  return (
    <View style={{flex: 1}}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15, marginVertical: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black_level_2,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginVertical: 10,
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 20,
                color: colors.pg,
                fontWeight: '700',
              }}>
              Update Order
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign
                name="closecircleo"
                size={30}
                style={{}}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>

          <View>
            {/* <CustomTextInput
              width={'100%'}
              border={true}
              placeholder={'Order Status'}
              onChangeText={text => {}}
            /> */}
            <CustomDropDown
              data={statusData}
              setData={text => setStatus(text)}
            />
            <CustomButton
              width={'100%'}
              text={'Update Order'}
              onPress={handleUpdateOrder}
            />
          </View>
        </View>
      </ActionSheet>
      <ScrollView
        style={{padding: 15}}
        contentContainerStyle={{paddingBottom: 150}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: colors.primaryGreen,
            borderRadius: 15,
            padding: 20,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Feather name="box" size={50} color={colors.white} />
          <View style={{marginLeft: 15}}>
            <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 16,
                color: colors.white,
              }}>
              Order Id: #{item?.orderId ?? 'UYTGH89'}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                fontSize: 20,
                color: colors.white,
              }}>
              {orderStatus ?? ''}
            </Text>
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
              paddingBottom: 10,
              paddingTop: 20,
              marginVertical: 15,
            }}>
            Items:
          </Text>
          {item?.cartItem &&
            item.cartItem.map((ele, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.primaryGreen,
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginRight: 15,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={20}
                    color={colors.black}
                  />
                  <View
                    style={{
                      width: '55%',
                      overflow: 'hidden',
                      marginLeft: 15,
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                      }}>
                      {ele.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                      }}>
                      {ele.description}
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                      }}>
                      ₹{ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
              paddingTop: 20,
            }}>
            Payment Details
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black,
              borderBottomWidth: 1,
              paddingBottom: 20,
              marginVertical: 15,
            }}>
            <View>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  lineHeight: 25,
                }}>
                Bag Total
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  lineHeight: 25,
                }}>
                Coupon Discount
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  lineHeight: 25,
                }}>
                Delivery
              </Text>
            </View>

            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  lineHeight: 25,
                }}>
                ₹133
              </Text>
              <Text
                style={{
                  color: colors.red,
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  lineHeight: 25,
                }}>
                Apply Coupon
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 20,
                  lineHeight: 25,
                }}>
                ₹50.00
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
           {/*  {item.totalAmount}  */}
            </Text>
          </View>

          <View style={{marginVertical: 15}}>
            <Text
              style={{
                color: colors.primaryGreen,
                fontFamily: 'Lato-Bold',
                fontSize: 20,
                // paddingBottom: 10,
                paddingTop: 20,
              }}>
              Adress:
            </Text>
            <Text
              ext
              style={{
                color: colors.black,
                fontFamily: 'Lato-Regular',
                fontSize: 16,
              }}>
              Rick Nelon
            </Text>
            <Text
              ext
              style={{
                color: colors.black,
                fontFamily: 'Lato-Regular',
                fontSize: 16,
              }}>
              HKL Appartments,678
            </Text>
            <Text
              ext
              style={{
                color: colors.black,
                fontFamily: 'Lato-Regular',
                fontSize: 16,
              }}>
              NK.09, 670142
            </Text>
          </View>

          <View style={{marginVertical: 15}}>
            <Text
              style={{
                color: colors.primaryGreen,
                fontFamily: 'Lato-Bold',
                fontSize: 20,
                // paddingBottom: 10,
                paddingTop: 20,
              }}>
              Payment Method:
            </Text>
            <View
              style={{
                marginVertical: 15,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <FontAwesome name="cc-visa" size={30} color={colors.black} />
              <View style={{marginLeft: 15}}>
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                  }}>
                  *** *** **** 7878
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                  }}>
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{position: 'absolute', bottom: 0, width: '100%', padding: 15}}>
        <View>
          <CustomButton
            text={'Update Status'}
            width={'100%'}
            onPress={() => actionSheetRef.current?.show()}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderDetails;
