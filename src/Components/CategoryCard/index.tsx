/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ChildCollection from '../../Models/childCollection';

interface Props {
  title: string;
  listSubCategory: ChildCollection[];
  onPressSubItem: (val: string) => void;
}

const CategoryCard: React.FC<Props> = (props) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [heightAnimated, setHeightAnimated] = useState(0);
  function renderSubCategory(arr: ChildCollection[]){
    let result: ChildCollection[] = [];
    for (let item of arr){
      let widget: any = (
        <SubCardCategory key={item.id} tittle= {item.name} isDisable={!isExpand}  onPressItem={(val) => props.onPressSubItem(val)}/>
      );
      result.push(widget);
    }
    return result;
  }
  return (
    <View >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setIsExpand(!isExpand);
          setHeightAnimated(!isExpand ? undefined : 0);
        }}>
        <View style={style.header}>
      <Text style={style.textStyle}>{props.title}</Text>
          <Icon
            name={isExpand ? 'angle-down' : 'angle-right'}
            type="font-awesome"
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: heightAnimated,
          backgroundColor: 'white',
          marginLeft: 30,
        }}>
        {renderSubCategory(props.listSubCategory)}
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
 isDisable: boolean;
 onPressItem: (val: string) => void;
}
export const SubCardCategory: React.FC<subProps> = (prop) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress = {() => prop.onPressItem(prop.tittle)} disabled={prop.isDisable}>
       <View style={{height: 60, justifyContent:'center', backgroundColor: 'white'}}>
  <Text style={style.subTextStyle}>{prop.tittle}</Text>
        </View>
    </TouchableOpacity>
  );
};
