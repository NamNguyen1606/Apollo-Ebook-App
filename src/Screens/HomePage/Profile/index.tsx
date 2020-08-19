import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../../../Utils/color';

interface Props {}

const ProfileScreen = () => {
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
              source={{uri: 'https://i.imgflip.com/2pg1ta.jpg'}}
              resizeMode="cover"
            />
          </View>
          <View style={style.info}>
            <Text style={style.nameTxt}>Nam Nguyen</Text>
            <Text style={style.addressTxt}>Binh Thanh, Tp.HCM</Text>
          </View>
          {/* <View style={style.iconHolder}>
            <Icon style={style.icon} name="edit" type="entypo" color="grey" />
          </View> */}
        </View>
      </View>
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
