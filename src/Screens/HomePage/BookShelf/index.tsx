/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../../../Utils/color';
import {useQuery} from 'react-query';
import PacketApi from '../../../Api/packetApi';
import {PacketCard} from '../../../Components';
import Route from '../../../Utils/router';
import LottieView from 'lottie-react-native';
const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  navigation: any;
}

const BookshelfScreen: React.FC<Props> = (props) => {
  const [index, setIndex] = useState(0);
  const packetData = useRef<any[]>([]);
  const indexData = useRef<number>(0);
  const [isModalPurchasingVisible, setIsModalPurchasingVisible] = useState<
    boolean
  >(false);
  const showPurchaseModal = () =>
    setIsModalPurchasingVisible(!isModalPurchasingVisible);

  const [idPacket, setIdPacket] = useState<string>('');

  const getPurchaseApi = async (key: any, token: any, id: string) =>
    await PacketApi.purchasePacket(token, id);
  const {status: purchaseStatus, data: purchaseData}: any = useQuery(
    ['purchase', Token, idPacket],
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

  const onPurchasePacket = (packetId: any) => {
    setIsModalPurchasingVisible(true);
    setIdPacket(packetId);
  };

  const loadingPacket = async (key: any, index: number) => {
    const res = await PacketApi.getPacket(Token, index * 10, 10, 0);
    return res;
  };
  const {data, status}: any = useQuery(['packets', index], loadingPacket);

  function mergeData(): any[] {
    if (status === 'success') {
      if (
        packetData.current.length === 0 ||
        packetData.current[packetData.current.length - 1].PacketID !==
          data[data.length - 1].PacketID
      ) {
        packetData.current = [...packetData.current, ...data];
      }
    }
    return packetData.current;
  }

  const loadingMore = () => {
    const totalPacket = packetData.current[0].TotalPackets;
    const maxIndex = Math.floor(totalPacket / 10);
    console.log(`max index: ${maxIndex}`);
    console.log(`index: ${indexData}`);
    indexData.current < maxIndex && setIndex(++indexData.current);
  };

  const renderItem = ({item}: any) => (
    <PacketCard
      style={{marginTop: 10}}
      tittle={item.PacketName}
      description={item.Descriptions}
      img={item.CoverUrl}
      price={item.Price}
      packetId={item.PacketID}
      onPressItem={(book) =>
        props.navigation.navigate(Route.DetailBook, {book})
      }
      onPurchasePress={(packetId) => onPurchasePacket(packetId)}
    />
  );

  return (
    <View style={style.container}>
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
      <View style={style.middle}>
        {packetData.current.length !== 0 || status === 'success' ? (
          <FlatList
            data={mergeData()}
            renderItem={renderItem}
            keyExtractor={(item) => item.PacketID}
            getItemLayout={(data: any, index: any) => ({
              length: 180,
              offset: 180 * index,
              index,
            })}
            onEndReachedThreshold={0.7}
            onEndReached={loadingMore}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <LottieView
            style={{height: 100, width: 100}}
            source={require('../../../Asset/Animation/loading.json')}
            autoPlay
            loop
          />
        )}
      </View>
      {showStatusPurchasing()}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: Colors.Background,
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
  // loading: {

  // }
});

export default BookshelfScreen;
