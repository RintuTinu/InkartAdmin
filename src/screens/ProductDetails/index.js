import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../commom/colors';
import NavigationBack from '../../commom/NavigationBack';
import Accordion from 'react-native-collapsible/Accordion';
import {style} from './style';
import CustomTextinput from '../../components/CustomTextinput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const [activeSections, setActiveSections] = useState([0]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Description',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome
          style={{marginRight: 4}}
          name="edit"
          size={30}
          color={colors.black_level_2}
        />
      </TouchableOpacity>
    );
  };

  const SECTIONS = [
    {
      title: 'Manufacturer Details',
      content:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      title: 'Product Disclaimer',
      content:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      title: 'Features & Details',
      content:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
  ];
  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  const _renderHeader = section => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colors.black,
            fontFamily: 'Lato-Bold',
            fontSize: 18,
            marginVertical: 5,
          }}>
          {section.title}
        </Text>
        <Image
          style={{
            width: 20,
            height: 20,
            resizeMode: 'cover',
            marginRight: 10,
          }}
          source={require('../../assets/images/down-arrow2.png')}
        />
      </View>
    );
  };
  const _renderContent = section => {
    return (
      <View>
        <Text
          style={{
            color: colors.placeholder,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          }}>
          {section.content}
        </Text>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{padding: 20}}>
        <Image
          source={{uri: product.image}}
          style={{width: '100%', height: 200, resizeMode: 'contain'}}
        />
      </View>
      <View style={{flex: 1, backgroundColor: colors.white, padding: 15}}>
        <Text
          style={{
            fontFamily: 'Lato-Black',
            color: colors.black,
            fontSize: 22,
            lineHeight: 45,
          }}>
          {product.name}
        </Text>

        <Text
          style={{
            fontFamily: 'Lato-Regular',
            color: colors.black,
            fontSize: 18,
          }}>
          ₹{product.price}
          {'  '}
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              color: colors.primaryGreen,
              fontSize: 18,
            }}>
            25% off
          </Text>
        </Text>
        {/* description */}
        <View style={style.descriptionWrap}>
          <Text style={style.descriptionTitle}>Product Details</Text>
          <Text style={style.descriptionValue}>{product.description}</Text>
        </View>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          underlayColor={'transparent'}
          sectionContainerStyle={{
            borderBottomColor: colors.borderGrey,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingVertical: 10,
          }}
        />
        {/* delivery details */}
        <View>
          <Text
            style={{
              fontSize: 18,
              color: colors.black,
              fontFamily: 'Lato-Bold',
              marginVertical: 20,
            }}>
            Check Delievry
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.placeholder,
              fontFamily: 'Lato-Regular',
            }}>
            Enter pincode to check delivery date/pickup option.
          </Text>
          <CustomTextinput
            placeholder={'Pin Code'}
            onChange={text => {}}
            width={'100%'}
            border={true}
            onChangeText={text => {}}
            icon={<Text>Check</Text>}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.placeholder,
                fontFamily: 'Lato-Regular',
              }}>
              Free delivery on orders above 200.00
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.placeholder,
                fontFamily: 'Lato-Regular',
              }}>
              Cash on delivery available.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.placeholder,
                fontFamily: 'Lato-Regular',
              }}>
              Easy 21 days return and exchange.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ProductDetails;