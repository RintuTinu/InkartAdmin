import {View, Text, Image, ScrollView, TouchableOpacity} from  'react-native';
import React,  {useState} from 'react';
import CustomTextinput from '../../components/CustomTextinput';
import CustomButton from '../../components/customButton';
import colors from '../../commom/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import { login } from '../../store/actions';

const Login = () => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (email.trim () === 'admin@yopmail.com' && password.trim() === '123') {
                await firestore()
                .collection('Users')
                .where('email', '==', email.trim().toLocaleLowerCase())
                .get()
                .then(async snapshort => {
                    if (!snapshort.empty) {
                        snapshort.forEach(documentSnapshort => {
                            const respData = documentSnapshort.data();
                            if(password.trim() === respData.password){
                                dispatch(login({userId: documentSnapshort.id}));
                                Snackbar.show({
                                    text: 'Login Successfull',
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor:colors.primaryGreen,
                                    textColor: colors.white,
                                  });
                            } else {
                                Snackbar.show({
                                    text: 'The password you entered is wrong',
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor:colors.red,
                                    textColor: colors.white,
                                  });
                            }
                        });
                    }
                })
                .catch(err => console.warn(err));
        } else {
           Snackbar.show({
                text: 'The entered credentials are wrong. please check again.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor:colors.red,
                textColor: colors.white,
              });
        }
    };
    const handleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    return (
        <View style={{flex: 1}}> 
        <Image 
        source={require('../../assets/images/topBg.png')}
        style={{width: '100%', height: 150}}
        />
        <ScrollView
        style={{
            marginTop: -25,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: '#fff',
        }}>
        <Image 
        source={require('../../assets/images/logo.jpeg')}
        style={{
            width: 250, 
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
        }}
        />
        <Text
        style={{
            fontFamily:'Lato-Bold',
            fontSize: 22,
            textAlign: 'center',
            marginBottom: 20,
            color: colors.black,
        }}>
         Admin Login
        </Text>
        <CustomTextinput 
          width={'90%'} 
          border={true}
          placeholder={'E-mail'} 
          onChangeText={text => setEmail(text)}
          icon={
            <Image 
                source={require('../../assets/images/user.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          }
          />
        <CustomTextinput
          width={'90%'} 
          onChangeText={text => setPassword(text)}
          border={true} 
          placeholder={'Password'}
          secureTextEntry={secureTextEntry}
          icon={
            <TouchableOpacity onPress={handleSecureTextEntry}>
            <Image 
                source={
                secureTextEntry
                ? require('../../assets/images/hide.png') 
                : require('../../assets/images/view.png')
            }
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
            </TouchableOpacity>
          }
          />
        <CustomButton width={'90%'} text={'Login'} onPress={handleLogin} />
        </ScrollView>
        </View>
    );
};

export default Login;