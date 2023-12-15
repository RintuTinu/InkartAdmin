import {View, Text, TouchableOpacity, FlatList, ImageBackground, Dimensions, StyleSheet, Image, Alert} from 'react-native'
import React, {useLayoutEffect, useCallback, useState, useRef} from 'react'
import NavigationBack from '../../commom/NavigationBack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../../commom/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/customButton';
import {style} from './style';
import CustomTextinput from '../../components/CustomTextinput';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uploadImage from '../../commom/storage';
import Feather from 'react-native-vector-icons/Feather'

const Banner = () => {
    const navigation = useNavigation();
    const [banners, setBanners] = useState([]);
    const [head, setHead] = useState('');
    const [desc, setDesc] = useState('');
    const {width, height} = Dimensions.get('screen');
    const actionSheetRef = useRef(null);
    const [bannerId, setBannerId] = useState(null);
    const [uploadUri, setUploadUri] = useState(null);
    const [type, setType] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Banners',
            headerLeft: () => <NavigationBack />,
            headerRight: () => <RightComponent/>
        });
    }, [navigation]);

    const RightComponent = () => {
        return (
          <TouchableOpacity
           onPress={() => {
            setType('add');
            actionSheetRef.current?.show()
            }}>
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
            getBanners();
        }, []),
    );

   const getBanners = async () => {
    await firestore()
    .collection('Banners')
    .get()
    .then(snapshort => {
        if (snapshort.empty) {
            Snackbar.show({
                text: 'No Banners found',
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


const handleCreate = async () => {
  if(
    uploadUri &&
    head !== '' &&
    desc !== '' 
    ) {
    const responseUri = await uploadImage(uploadUri);
    const product = {
      description: desc,
      head: head,
      image: responseUri,
    };
    await firestore()
    .collection('Banners')
    .doc(data.id)
    .add(product)
    .then(() => {
      Snackbar.show({
        text: 'Banner Added successfully',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor:colors.primaryGreen,
        textColor: colors.white,
      });
      actionSheetRef.current?.hide();
      setHead('');
      setDesc('');
      setUploadUri(null);
      getBanners();
    });
  } else {
    Snackbar.show({
      text: 'Fill up all the fields to continue.',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor:colors.red,
      textColor: colors.white,
    });
  }
};

const handleCamera = async () => {
  const options = {
    mediaType: 'photo',
  };
  await launchCamera(options, response => {
    if(response && response.assets){
    setUploadUri(response?.assets[0]?.uri);
    }
  });
};
const handleGallery = async () => {
  const options = {
    mediaType: 'photo',
  };
  await launchImageLibrary(options, response => {
    if(response && response.assets){
      setUploadUri(response?.assets[0]?.uri);
      }
  });
};

const handleDelete =  async bannerData => {
  Alert.alert
    ('Confirm Banner Deletion', 
    'Do you want to delete this banner, deleting the banner will lose the banner data displayed on user dashboard.', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'Delete Banner', 
        onPress: async () => { 
        await firestore()
        .collection('Banners')
        .doc(bannerData.id)
        .delete()
        .then(() => {
          Snackbar.show({
            text: 'Banner Deleted successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor:colors.white_level_3,
            textColor: colors.black_level_3,
          });
        });
        getBanners();
       }},
    ]);
};

const handleEdit = bannerData => {
  setBannerId(bannerData.id);
  setHead(bannerData.head);
  setDesc(bannerData.description);
  setUploadUri(bannerData.image);
  setType('update');
  actionSheetRef.current?.show();
};

const handleUpdateSubmit = async () => {
 if (bannerId && uploadUri && head !== '' && desc !== '') {
  const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri;
  const product = {
    description: desc,
    head: head,
    image: responseUri,
  };
  await firestore()
  .collection('Banners')
  .doc(bannerId)
  .update(product)
  .then(() => {
    Snackbar.show({
      text: 'Banner Updated successfully',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor:colors.primaryGreen,
      textColor: colors.white,
    });
    actionSheetRef.current?.hide();
    setHead('');
    setDesc('');
    setUploadUri(null);
    getBanners();
  });
} else {
  Snackbar.show({
    text: 'Fill up all the fields to continue.',
    duration: Snackbar.LENGTH_LONG,
    backgroundColor:colors.red,
    textColor: colors.white,
  });
}
};

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
                {type === 'add' ?  'Create Banner' : 'Update Banner'}
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
          <View style={{marginVertical: 20}}>
            <CustomTextinput
            width={'100%'}
            value={head}
            border={true}
            placeholder={'Heading'}
            onChangeText={text => setHead(text)}
            />
            <CustomTextinput
            width={'100%'}
            value={desc}
            border={true}
            placeholder={'Description'}
            onChangeText={text => setDesc(text)}
            multiline={true}
            />
 <View
 style={{
  justifyContent: 'center', 
  alignItems: 'center',
  padding: 15,
  marginVertical: 10,
  borderColor: colors.primaryGreen,
  borderWidth: 1,
  borderRadius: 8,
  }}>
    <Text
    style={{
      color: colors.black_level_2,
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      lineHeight: 55,
    }}>
      Upload  Image
    </Text>
    {uploadUri ? (
      <View>
        <TouchableOpacity
        style={{
          position: 'absolute', 
          zIndex: 9, 
          right: 0, 
          top: -10,
          backgroundColor: colors.white_level_3,
          borderRadius: 25,
          overflow: 'hidden',
        }}
              onPress={() => setUploadUri(null)}>
              <AntDesign
                name="closecircleo"
                size={30}
                style={{}}
                color={colors.black}
              />
            </TouchableOpacity>
      <Image
      source={{uri: uploadUri}}
      style={{width: 100, height: 100, resizeMode: 'contain'}}
      />
      </View>
    ) : (
<Entypo name="images" size={40} color={colors.black_level_2} />
    )}
</View>
             <View
          style={{
            paddingBottom: 10,
            padding: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity 
            onPress={handleCamera}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <AntDesign name="camerao" size={25} color={colors.primaryGreen} />
            <Text
             style={{
              color: colors.black_level_2,
              fontSize: 10,
              fontFamily: 'Lato-Regular',
            }}>
              Camera
            </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleGallery}
            style={{justifyContent: 'center', alignItems: 'center'}}>
          <Entypo  name="image" size={40} color={colors.primaryGreen} />
          <Text
           style={{
            color: colors.black_level_2,
            fontSize: 10,
            fontFamily: 'Lato-Regular',
          }}>
            Gallery
            </Text>
          </TouchableOpacity>
          </View>
            <CustomButton
              width={'100%'}
              text={type === 'add' ? 'Create Banner' : 'Update Banner'}
              onPress={type === 'add' ? handleCreate : handleUpdateSubmit}
            />
          </View>
        </View>
      </ActionSheet>
            <FlatList 
            data={banners}
            contentContainerStyle={{
                alignSelf: 'center',
                paddingBottom: 100,
             }}
             keyExtractor={(item, index) => String(index)}
             showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (
                    <ImageBackground
                    source={{uri: item.image}}
                    style={{
                        width: width * 0.9,
                        height: height * 0.2,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginTop: 10,
                    }}>
                       <View
                        style={{
                            position: 'absolute', 
                            top: 10, 
                            right: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: colors.white_level_3,
                            borderRadius: 10,
                            overflow: 'hidden',
                            padding: 10,
                            zIndex: 9,
                            }}>
                              <TouchableOpacity onPress={() => handleEdit(item)}>
                        <Feather
                        name="edit" 
                        size={25} 
                        color={colors.black_level_2} 
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item)}>
                        <AntDesign
                         name="delete" 
                         size={25} 
                         color={colors.black_level_2}
                         style={{marginLeft: 10}}
                          />
                       </TouchableOpacity>
                       </View>
                        <View style={{padding: 20}}>
                        <Text
                        style={{
                            color: colors.black_level_3,
                            fontSize: 20,
                            fontFamily: 'Lato-Black',
                        }}>
                        {item.head}
                        </Text>
                        <Text
                        style={{
                            color: colors.black_level_3,
                            fontSize: 16,
                            fontFamily: 'Lato-Regular',
                            marginTop: 15,
                        }}>
                        {item.description}
                        </Text>
                        </View>
                    </ImageBackground>
                );
            }}
            />
        </View>
    );
};

export default Banner;
