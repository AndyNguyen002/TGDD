import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MainButton from '../../components/MainButton';
import MainInput from '../../components/MainInput';
export default function LoginScreen({ navigation }) {
  const [taikhoan, setemail] = useState('');
  const [matkhau, setpassword] = useState('');
  const goToHome = () => {
    if (taikhoan.trim() == '' || !taikhoan) {
      alert('Không được để trống tài khoản !');
    } else if (matkhau.trim() == '' || !matkhau) {
      alert('Không được để trống mật khẩu !');
    } else {
      login();
    }
  };
  const login = async () => {
    axios.get('https://raw.githubusercontent.com/AndyNguyen002/TGDD/main/data/db.json').then(response => {
      let userData = response.data.NguoiDung
      console.log(response.data)
      if (userData) {
        let arr = [...userData];
        arr = arr.filter(
          (value) =>
            value.taikhoan.toLocaleLowerCase() == taikhoan.toLocaleLowerCase() &&
            value.matkhau == matkhau
        );
        if (arr.length > 0) {
          alert('Đăng nhập thành công', arr[0].taikhoan)
          let curUser = arr[0];
          AsyncStorage.setItem('curUser', JSON.stringify(curUser));
          navigation.replace('HomeTab');
        } else alert('Tài khoản hoặc mật khẩu không chính xác!');
      } else {
        alert('Tài khoản hoặc mật khẩu không chính xác!');
      }
    });
  };

  const goToSignUp = async () => {
    navigation.navigate('SignUpScreen');
  };
  const checkLogin = async () => {
    let userData = await AsyncStorage.getItem('curUser');
    if (userData) console.log(1)
    // if (userData) navigation.replace('HomeTab');
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 12,
            backgroundColor: '#fff',
          }}
        >
          <Image
            style={{
              alignSelf: 'center',
              height: 80,
              resizeMode: 'contain',
              width: 300,
              
            }}
            source={require('../../assets/iconnew.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000',
              fontSize: 25,
              marginBottom: 50,
            }}
          >
           Đăng nhập
          </Text>

          <MainInput
            title={'Email'}
            placeholder={'Nhập email'}
            value={taikhoan}
            onChangeText={setemail}
          />
          <MainInput
            placeholder={'Nhập mật khẩu'}
            title={'Mật khẩu'}
            value={matkhau}
            secureTextEntry={true}
            onChangeText={setpassword}
            
          />
          <MainButton
            style={{ marginTop: 20 }}
            title={'Đăng Nhập'}
            onPress={goToHome}
          />
          <MainButton
            style={{ marginTop: 12 }}
            title={'Đăng Ký'}
            isSubButton={true}
            onPress={goToSignUp}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
