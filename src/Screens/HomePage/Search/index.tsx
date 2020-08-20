/* eslint-disable prettier/prettier */
import React, {useState, useContext, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../../../Utils/color';
import {TextField, CategoryCard} from '../../../Components';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Route from '../../../Utils/router';
import {Animated} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {BookCollectionType} from '../../../Utils/SearchCollection';
import {GlobalContext} from '../../../Utils/StoreProvider';

interface Props {}

const SearchScreen = () => {
  const navigation = useNavigation();
  const {categoryData} = useContext(GlobalContext);
  const [search, setSearch] = useState<string>();
  const [indexType, setIndexType] = useState(0);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [pickerViewHeight] = useState(new Animated.Value(100));

  const showPicker = () => {
    Animated.spring(pickerViewHeight, {
      toValue: !isShow ? 150 : 100,
      bounciness: 0,
      speed: 20,
      useNativeDriver: false,
    }).start();
  };

  const onSubItemPress = useCallback(
    (val) =>
      navigation.navigate(Route.CategoryResult, {
        title: val.title,
        collectionId: val.id,
      }),
    [navigation],
  );

  const onShowPicker = () => {
    showPicker();
    setIsShow(!isShow);
  };

  const onSelected = (index: number) => {
    setIndexType(index);
  };

  const fillTypes = ['All', 'Top Sell', 'Introduce'];

  const onSearch = () => {
    var searchType = BookCollectionType.All;
    switch (indexType) {
      case 0:
        searchType = BookCollectionType.All;
        break;
      case 1:
        searchType = BookCollectionType.BestSeller;
        break;
      case 2:
        searchType = BookCollectionType.Introduce;
        break;
    }
    navigation.navigate(Route.SearchResult, {
      collection: searchType,
      searchContent: search,
    });
  };

  // FlatList
  const renderItem = useCallback(
    ({item}: any) => (
      <CategoryCard
        title={item.name}
        listSubCategory={item.children}
        onPressSubItem={(val) => onSubItemPress(val)}
      />
    ),
    [onSubItemPress],
  );
  const getKeyExtractor = (item: any) => item.id;

  const renderHearList = () => <Text style={style.title}>All Categories</Text>;

  const renderFlatList = useMemo(() => {
    return (
      <FlatList
        ListHeaderComponent={renderHearList}
        data={categoryData?.data}
        renderItem={renderItem}
        keyExtractor={getKeyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [categoryData?.data, renderItem]);

  return (
    <View style={style.container}>
      <Animated.View style={[style.header, {height: pickerViewHeight}]}>
        <TextField
          style={style.textField}
          title="Search book or author"
          icon="search"
          onChangeText={(val) => setSearch(val)}
          onFocus={onShowPicker}
          onBlur={onShowPicker}
          returnKeyType="search"
          onSubmit={onSearch}
        />

        <ButtonGroup
          containerStyle={isShow ? style.btnGroupShow : style.btnGroupHide}
          buttons={fillTypes}
          onPress={onSelected}
          selectedIndex={indexType}
        />
      </Animated.View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={style.middle}>{renderFlatList}</View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  middle: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  textField: {
    backgroundColor: 'white',
  },
  picker: {
    height: '30%',
    width: 150,
  },
  btnGroupShow: {height: 35, marginTop: 15},
  btnGroupHide: {height: 0, opacity: 0},
});
export default SearchScreen;
