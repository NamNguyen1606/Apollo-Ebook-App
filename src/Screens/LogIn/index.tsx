/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../../Utils/color';
import {Icon} from 'react-native-elements';
import Route from '../../Utils/router';
import {TextField, Button, IconBox} from '../../Components';
import Book from '../../Models/book';
import BookApi from '../../Api/bookApi';
interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  let newBookList: Book[] = [];
  let bestSellerBookList: Book[] = [];
  async function getBookData(index: number, count: number) {
    const newBookResponse: any = await BookApi.getAllNewBook(
      index,
      count,
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE',
    );
    const bestSellerResponse: any = await BookApi.getAllBestSellerBook(
      index,
      count,
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE',
    );
    const newBookListData: Book[] = newBookResponse.map((item: any) => {
      return new Book(
        item.Success,
        item.Author,
        item.BookID,
        item.CoverUrl,
        item.FileSize,
        item.Price,
        item.PublishYear,
        item.Title,
        item.TotalBooks,
        item.Sumarize,
      );
    });
    const bestSellerListData: Book[] = bestSellerResponse.map((item: any) => {
      return new Book(
        item.Success,
        item.Author,
        item.BookID,
        item.CoverUrl,
        item.FileSize,
        item.Price,
        item.PublishYear,
        item.Title,
        item.TotalBooks,
        item.Sumarize,
      );
    });
    newBookList = newBookListData;
    bestSellerBookList = bestSellerListData;
  }
  useEffect(() => {
    getBookData(0, 10);
  }, []);
  async function logIn() {
    // setIsLogin(true);
    // console.log(`${email} + ${password}`);
    // const response: any = await AuthApi.loginByPassword(
    //   'rv7yjdz10sh0q06362ugd1n4gjpy4b',
    //   email,
    //   password,
    // );
    // StoreData.setUserInfo(response);
    // if (response.Success) {
    //   navigation.navigate('HomePage');
    // } else {
    //   Alert.alert('Error', response.Message);
    // }
    // setIsLogin(false);
    navigation.navigate(Route.HomePage, {
      newBookData: newBookList,
      bestSellerData: bestSellerBookList,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <View style={style.header}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              marginTop: 20,
              marginLeft: 15,
            }}>
            <Icon
              name="chevron-back"
              type="ionicon"
              color="white"
              size={33}
              onPress={() => {
                navigation.navigate(Route.Welcome);
              }}
            />
          </View>
          <View style={{flex: 8, justifyContent: 'center'}}>
            <Text style={style.titleStyle}>Welcome Back!</Text>
            <Text style={style.subTitleStyle}>
              Log in with your email & password
            </Text>
          </View>
        </View>
        <View style={style.middle}>
          <TextField
            title="Email"
            icon="envelope"
            onChangeText={(val) => setEmail(val)}
          />
          <TextField
            style={{marginTop: 10}}
            title="Password"
            isPassword={true}
            onChangeText={(val) => setPassword(val)}
          />
          <Button
            style={{height: 55, marginTop: 14}}
            tittle="LOG IN"
            isDisable={isLogin}
            onPress={logIn}
          />
        </View>
        <View style={style.footer}>
          <Text style={{fontSize: 15, color: Colors.SubText, marginTop: 15}}>
            Forgot Password?
          </Text>
          <Text style={{fontSize: 15, color: '#A4A7A9', marginVertical: 25}}>
            Log in With
          </Text>
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              // marginTop: 20,
            }}>
            <IconBox icon="facebook" />
            <IconBox icon="twitter" />
            <IconBox icon="google" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 5,
    backgroundColor: Colors.Background,
  },
  middle: {
    flex: 2.5,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
  },
  footer: {
    flex: 2.5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 25,
    color: Colors.Text,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitleStyle: {
    fontSize: 16,
    color: Colors.Text,
    textAlign: 'center',
  },
});
export default LoginScreen;
