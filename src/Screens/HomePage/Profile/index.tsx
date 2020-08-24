import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../../../Utils/color';
import {Button} from '../../../Components';
import StoreData from '../../../Utils/storeData';
import {GlobalContext} from '../../../Utils/StoreProvider';
import {useNavigation} from '@react-navigation/native';
import Route from '../../../Utils/router';

interface Props {}

const ProfileScreen = () => {
  const {userInfo} = useContext(GlobalContext);
  const navigation = useNavigation();
  const logout = () => {
    StoreData.clear();
    userInfo?.setData(null);
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerTittle}>Setting</Text>
      </View>
      <View style={style.body}>
        <View style={style.profile}>
          <View style={style.imgHolder}>
            <Image
              style={style.img}
              source={{
                uri:
                  'https://png.pngtree.com/element_our/png_detail/20181226/avatar-vector-icon-png_276860.jpg',
              }}
              resizeMode="cover"
            />
          </View>
          {userInfo!.data ? (
            <View style={style.info}>
              <Text style={style.nameTxt}>{userInfo?.data.name}</Text>
              <Text style={style.addressTxt}>Binh Thanh, Tp.HCM</Text>
            </View>
          ) : (
            <Button
              tittle="Login"
              onPress={() => navigation.navigate(Route.Welcome)}
            />
          )}
        </View>
      </View>
      <Button tittle="Log Out" onPress={logout} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '10%',
    backgroundColor: Colors.Background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTittle: {
    fontSize: 26,
    color: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    marginTop: 20,
    paddingBottom: 20,
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: Colors.SubText,
    borderBottomWidth: 0.3,
  },
  imgHolder: {
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  info: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  iconHolder: {
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderColor: Colors.SubText,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 50,
  },
  nameTxt: {
    fontSize: 22,
    color: 'black',
  },
  addressTxt: {
    fontSize: 17,
    color: Colors.SubText,
  },
});
export default ProfileScreen;
