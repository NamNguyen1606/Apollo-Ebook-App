/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import ChildCollection from '../../Models/childCollection';

interface Props {
  title: string;
  listSubCategory: ChildCollection[];
  onPressSubItem: (val: {id: string; title: string}) => void;
}

const CategoryCard: React.FC<Props> = (props) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [heightAnimated] = useState(new Animated.Value(0));
  const sizeCategory = useMemo<number>(
    () => props.listSubCategory.length * 60,
    [props.listSubCategory.length],
  );

  function renderSubCategory(arr: ChildCollection[]) {
    let result: ChildCollection[] = [];
    for (let item of arr) {
      let widget: any = (
        <SubCardCategory
          key={item.id}
          tittle={item.name}
          id={item.id}
          isDisable={!isExpand}
          onPressItem={({id, title}) => props.onPressSubItem({id, title})}
        />
      );
      result.push(widget);
    }
    return result;
  }

  const onPress = () => {
    Animated.spring(heightAnimated, {
      toValue: !isExpand ? sizeCategory : 0,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setIsExpand(!isExpand);
          onPress();
        }}>
        <View style={style.header}>
          <Text
            style={[
              style.textStyle,
              isExpand ? {fontWeight: 'bold'} : {fontWeight: 'normal'},
            ]}>
            {props.title}
          </Text>
          <Icon
            name={isExpand ? 'angle-down' : 'angle-right'}
            type="font-awesome"
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            height: heightAnimated,
            backgroundColor: 'white',
            marginLeft: 30,
          },
          isExpand ? {opacity: 1} : {opacity: 0},
        ]}>
        {renderSubCategory(props.listSubCategory)}
      </Animated.View>
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
    borderTopWidth: 0.5,
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
    fontSize: 17,
    color: 'black',
  },
  subTextStyle: {
    fontSize: 16,
    color: '#212121',
  },
});
export default CategoryCard;

interface subProps {
  tittle: string;
  id: string;
  isDisable: boolean;
  onPressItem: (val: {id: string; title: string}) => void;
}
export const SubCardCategory: React.FC<subProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.onPressItem({id: props.id, title: props.tittle})}
      disabled={props.isDisable}>
      <View
        style={{
          height: 60,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={style.subTextStyle}>{props.tittle}</Text>
      </View>
    </TouchableOpacity>
  );
};
