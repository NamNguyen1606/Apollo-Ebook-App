/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Colors from '../../../Utils/color';
import {useQuery, useInfiniteQuery} from 'react-query';
import PacketApi from '../../../Api/packetApi';
import {PacketCard} from '../../../Components';
import Route from '../../../Utils/router';
import LottieView from 'lottie-react-native';
import {APP_TOKEN} from '../../../Api/axiosClient';
import {GlobalContext} from '../../../Utils/StoreProvider';

interface Props {
  navigation: any;
}

const PacketScreen: React.FC<Props> = (props) => {
  const {userInfo} = useContext(GlobalContext);
  const [isModalPurchasingVisible, setIsModalPurchasingVisible] = useState<
    boolean
  >(false);
  const showPurchaseModal = () =>
    setIsModalPurchasingVisible(!isModalPurchasingVisible);

  const [idPacket, setIdPacket] = useState<string>('');

  const getPurchaseApi = async (key: any, token: any, id: string) =>
    await PacketApi.purchasePacket(token, id);
  const {status: purchaseStatus, data: purchaseData}: any = useQuery(
    ['purchase', APP_TOKEN, idPacket],
    getPurchaseApi,
  );

  function showStatusPurchasing() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalPurchasingVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* //TODO: Loading */}
          {purchaseStatus === 'loading' && (
            <View
              style={{
                height: 250,
                width: '70%',
                backgroundColor: 'transparent',
                borderRadius: 20,
                justifyContent: 'center',
              }}>
              <LottieView
                style={{height: 150, width: 150, alignSelf: 'center'}}
                source={require('../../../Asset/Animation/loading.json')}
                autoPlay
                loop={true}
              />
            </View>
          )}

          {/* //TODO: Loading success */}
          {purchaseStatus === 'success' && (
            <View
              style={{
                height: 250,
                width: '70%',
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              {purchaseData.Success !== true ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingTop: 15,
                  }}>
                  <LottieView
                    style={{height: 100, width: 100, alignSelf: 'center'}}
                    source={require('../../../Asset/Animation/failure.json')}
                    autoPlay
                    loop={false}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#d32f2f',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    PAYMENT FAILED
                  </Text>
                  <TouchableOpacity onPress={showPurchaseModal}>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#CD5050',
                        justifyContent: 'center',
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        TRY AGAIN
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingTop: 15,
                  }}>
                  <LottieView
                    style={{height: 100, width: 100, alignSelf: 'center'}}
                    source={require('../../../Asset/Animation/success.json')}
                    autoPlay
                    loop={false}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#00c853',
                      alignSelf: 'center',
                    }}>
                    PAYMENT SUCCESS
                  </Text>
                  <TouchableOpacity onPress={showPurchaseModal}>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#00c853',
                        justifyContent: 'center',
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        DONE
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {purchaseStatus === 'error' && (
            <View
              style={{
                height: 250,
                width: '70%',
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingTop: 15,
                }}>
                <LottieView
                  style={{height: 100, width: 100, alignSelf: 'center'}}
                  source={require('../../../Asset/Animation/failure.json')}
                  autoPlay
                  loop={false}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: '#d32f2f',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  PAYMENT FAILED
                </Text>
                <TouchableOpacity onPress={showPurchaseModal}>
                  <View
                    style={{
                      height: 50,
                      backgroundColor: '#CD5050',
                      justifyContent: 'center',
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      TRY AGAIN
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    );
  }

  const onPurchasePacket = useCallback(
    (packetId: any) => {
      if (userInfo!.data) {
        setIsModalPurchasingVisible(true);
        setIdPacket(packetId);
      } else {
        Alert.alert('Warning', 'you should login for purchase');
      }
    },
    [userInfo],
  );

  const loadingPacket = async (key: any, index: number = 0) => {
    const res = await PacketApi.getPacket(APP_TOKEN, index, 10, 0);
    return res;
  };

  const convertData: any = () => {
    var result: any = [];
    data?.map((item: any) => item.map((subItem: any) => result.push(subItem)));
    return result;
  };

  const loadingMore = () => {
    canFetchMore && fetchMore();
  };

  const onPressItem = useCallback(
    (book) => props.navigation.navigate(Route.DetailBook, {book}),
    [props.navigation],
  );
  const {
    data,
    isSuccess,
    fetchMore,
    isFetching,
    canFetchMore,
    isLoading,
  } = useInfiniteQuery(['packet'], loadingPacket, {
    getFetchMore: (lastGroup: any, allGroup: any) => {
      if (lastGroup.length === 10) {
        return allGroup.length * 10;
      } else {
        return false;
      }
    },
  });

  const renderItem = useCallback(
    ({item}: any) => (
      <PacketCard
        style={style.packetCard}
        tittle={item.PacketName}
        description={item.Descriptions}
        img={item.CoverUrl}
        price={item.Price}
        packetId={item.PacketID}
        onPressItem={(book) => onPressItem(book)}
        onPurchasePress={(packetId) => onPurchasePacket(packetId)}
      />
    ),
    [onPressItem, onPurchasePacket],
  );
  const getKeyExtractor = useCallback((item: any) => item.PacketID, []);
  const getItemLayout = useCallback(
    (data: any, index: any) => ({
      length: 180,
      offset: 180 * index,
      index,
    }),
    [],
  );

  const renderEmptyAnimation = () => {
    if (!isLoading) {
      if (data![0].length === 0) {
        return (
          <LottieView
            source={require('../../../Asset/Animation/empty_box.json')}
            autoPlay
            loop
          />
        );
      }
    } else {
      return null;
    }
  };

  const renderFooter = () => {
    if (isFetching) {
      return (
        <LottieView
          style={style.loading}
          source={require('../../../Asset/Animation/loading.json')}
          autoPlay
          loop
        />
      );
    } else {
      return null;
    }
  };

  const renderHeader = () => (
    <View style={style.header}>
      <ImageBackground
        style={{flex: 1}}
        source={{
          uri:
            'https://images.creativemarket.com/0.1.0/ps/6374392/300/200/m2/fpc/wm0/rz7tt7epyeamedl02kmk27udgkcpjcltux0kweivmuodculwfbq3roybhxfw7kfq-.jpg?1557575922&s=f9500d0ae1b0e8a3679358049c4ea48f',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={style.titleHeader}>Packet</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={style.container}>
      {isSuccess ? (
        <FlatList
          data={convertData()}
          renderItem={renderItem}
          keyExtractor={getKeyExtractor}
          getItemLayout={getItemLayout}
          onEndReachedThreshold={0.7}
          onEndReached={loadingMore}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
        />
      ) : (
        <LottieView
          style={style.loading}
          source={require('../../../Asset/Animation/loading.json')}
          autoPlay
          loop
        />
      )}
      {showStatusPurchasing()}
      {renderEmptyAnimation()}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  header: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: Colors.Background,
    width: '100%',
  },
  middle: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  category: {
    flex: 1.5,
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  titleHeader: {
    fontSize: 30,
    color: Colors.Text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  packetCard: {marginTop: 10, marginHorizontal: 10},
});

export default PacketScreen;
