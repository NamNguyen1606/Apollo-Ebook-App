import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

interface Props {
  tittle: string;
  img: string;
  onPress: () => void;
}

const CategoryTag: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View style={style.container}>
        <Image
          style={{flex: 1, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
          resizeMode="cover"
          source={{
            uri: props.img,
          }}
        />
        <Text numberOfLines={1} style={style.titleStyle}>
          {props.tittle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 10,
  },
  titleStyle: {
    paddingVertical: 3,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
export default CategoryTag;
