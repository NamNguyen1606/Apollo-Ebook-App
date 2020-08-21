/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import Colors from '../../Utils/color';
import {Icon, Divider} from 'react-native-elements';
import {TextField, Button, IconBox} from '../../Components';
import {vs, ms, hs} from '../../Utils/Scaling';

interface Props {
  navigation: any;
}

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function register() {
    const size = Dimensions.get('window');
    console.log(`${size.width} x ${size.height}`);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.iconHolder}>
            <Icon
              name="chevron-back"
              type="ionicon"
              color="white"
              size={33}
              onPress={() => {
                navigation.pop();
              }}
            />
          </View>
          <View style={{flex: 8, justifyContent: 'center'}}>
            <Text style={style.titleStyle}>Join Apollo Today!</Text>
            <Text style={style.subTitleStyle}>
              Create an account to start reading
            </Text>
          </View>
        </View>
        <View style={style.middle}>
          <TextField
            style={{marginBottom: vs(10)}}
            title="Full Name"
            icon="user"
            onChangeText={(val) => setFullName(val)}
          />
          <TextField
            style={{marginBottom: vs(10)}}
            title="Email"
            icon="envelope"
            onChangeText={(val) => setEmail(val)}
          />
          <TextField
            title="Password"
            isPassword={true}
            onChangeText={(val) => setPassword(val)}
          />
          <Button style={style.btn} tittle="REGISTER NOW" onPress={register} />
        </View>
        <View style={style.footer}>
          <Text style={{fontSize: ms(15), color: Colors.SubText}}>
            Already have an account?{' '}
            <Text
              style={{
                fontSize: ms(15),
                color: Colors.Background,
                textDecorationLine: 'underline',
              }}>
              Log In
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: vs(50),
              width: '100%',
            }}>
            <Divider style={{backgroundColor: 'black'}} />
            <Text style={{fontSize: ms(15), color: '#A4A7A9'}}>
              Register With
            </Text>
            <Divider style={{backgroundColor: 'black'}} />
          </View>
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
    flex: 3.5,
    backgroundColor: Colors.Background,
  },
  iconHolder: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: vs(20),
    marginLeft: hs(15),
  },
  middle: {
    flex: 4,
    backgroundColor: 'white',
    marginHorizontal: hs(20),
    marginTop: vs(15),
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: ms(25),
    color: Colors.Text,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitleStyle: {
    fontSize: ms(16),
    color: Colors.Text,
    textAlign: 'center',
  },
  btn: {height: vs(55), marginTop: vs(14)},
});
export default RegisterScreen;
