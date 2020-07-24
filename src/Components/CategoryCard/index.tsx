import React, {useState} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../../ultils/color';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {}

const CategoryCard: React.FC<Props> = (props) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [heightAnimated, setHeightAnimated] = useState<number>();
  return (
    <View>
      <View style={style.header}>
        <Text style={style.textStyle}>Science Fiction</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setIsExpand(!isExpand);
            setHeightAnimated(isExpand ? 3 * 20 : 0);
          }}>
          <View style={style.imgStyle}>
            <Icon
              name={isExpand ? 'angle-right' : 'angle-down'}
              type="font-awesome"
              size={30}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: heightAnimated,backgroundColor: 'white', marginLeft: 30}}>
        <Text style={style.subTextStyle}>Science Fiction</Text>
        <Text style={style.subTextStyle}>Science Fiction</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingRight: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#6D7176',
  },
  imgStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
  subTextStyle: {
    fontSize: 18,
    color: 'black',
  },
});
export default CategoryCard;
