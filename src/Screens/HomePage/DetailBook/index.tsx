/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {Button} from '../../../Components';
import MoneyFormat from '../../../Utils/moneyFormat';
import Colors from '../../../Utils/color';
import ReviewTab from '../ReviewTab';
import SynopsisTab from '../Synopsis';
import BookApi from '../../../Api/bookApi';
import style from './style';
import LottieView from 'lottie-react-native';
import {useQuery} from 'react-query';
import {Animated} from 'react-native';
import {APP_TOKEN} from '../../../Api/axiosClient';
import {GlobalContext} from '../../../Utils/StoreProvider';
import {vs} from '../../../Utils/Scaling';

const AppToken = APP_TOKEN;
interface Props {
  navigation: any;
  route: any;
}
const defaultImg =
  'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';

const DetailBookScreen: React.FC<Props> = (props) => {
  const {userInfo} = useContext(GlobalContext);
  const {book} = props.route.params;
  const [isReview, setIsReview] = useState(false);
  const [img, setImg] = useState(book.imgUrl);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalPurchasingVisible, setIsModalPurchasingVisible] = useState<
    boolean
  >(false);

  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 80);
  const headerTranslateY = diffClampScrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  const [token, setToken] = useState<string>('');
  const getPurchaseApi = async (key: any, token: any) =>
    await BookApi.purchaseBook(token, book.id);

  const {status, data}: any = useQuery(['purchase', token], getPurchaseApi);

  const onTabPress = useCallback((value: boolean) => {
    setIsReview(value);
  }, []);

  const showReviewModal = () => setIsModalVisible(!isModalVisible);

  const showPurchaseModal = () =>
    setIsModalPurchasingVisible(!isModalPurchasingVisible);

  async function getBookInfoData(key: any, token: any) {
    const response: any = await BookApi.getDetailBook(book.id, token);
    book.page = response.Pages;
    book.authorMore = response.AuthorMore;
    book.publisher = response.Publisher;
    book.subject = response.Subject;
    book.summary = response.Sumarize;
    return {...book, ...book};
  }

  // api
  const {data: bookData, isSuccess: isBookLoadingSuccess} = useQuery(
    ['book', {Token: AppToken}],
    getBookInfoData,
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
          {status === 'loading' && (
            <View
              style={{
                height: vs(250),
                width: '70%',
                backgroundColor: 'transparent',
                borderRadius: 20,
                justifyContent: 'center',
              }}>
              <LottieView
                style={style.lottieStatus}
                source={require('../../../Asset/Animation/loading.json')}
                autoPlay
                loop={true}
              />
            </View>
          )}

          {/* //TODO: Loading success */}
          {status === 'success' && (
            <View style={style.headerModal}>
              {data.Success !== true ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingTop: 15,
                  }}>
                  <LottieView
                    style={style.lottieStatus}
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
                    style={style.lottieStatus}
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

          {status === 'error' && (
            <View style={style.headerModal}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingTop: 15,
                }}>
                <LottieView
                  style={style.lottieStatus}
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

  function purchaseBook() {
    console.log(userInfo?.data);
    if (userInfo!.data) {
      setIsModalPurchasingVisible(true);
      setToken(userInfo!.data.token);
    } else {
      Alert.alert('Warning', 'you should login for purchase');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <Animated.View
        style={[
          style.subHeader,
          {
            transform: [{translateY: headerTranslateY}],
          },
        ]}>
        <View style={style.boxIcon}>
          <Icon
            name="chevron-back"
            type="ionicon"
            color="white"
            size={33}
            onPress={() => {
              props.navigation.pop();
            }}
          />
        </View>

        <View style={style.boxIcon}>
          <Icon
            name="cloud-download"
            type="font-awesome"
            color="white"
            size={26}
            onPress={() => {
              props.navigation.pop();
            }}
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        bounces={false}
        style={style.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <ImageBackground
          style={style.header}
          resizeMode="cover"
          imageStyle={{opacity: 0.35}}
          source={{
            uri: img,
          }}
          onError={() => setImg(defaultImg)}>
          <View style={style.middle}>
            <Image
              style={style.img}
              resizeMode="cover"
              source={{
                uri: img,
              }}
              onError={() => setImg(defaultImg)}
            />
            <View style={style.detail}>
              <Text
                style={style.title}
                adjustsFontSizeToFit
                minimumFontScale={0.5}
                numberOfLines={4}>
                {book.title}
              </Text>
              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.5}
                numberOfLines={1}
                style={style.author}>
                by {book.author}
              </Text>
              <Text style={style.author}>Published: {book.publicYear}</Text>
              <Text style={style.price}>{MoneyFormat.VND(book.price)}</Text>
              <Button
                style={style.btnPurchase}
                tittle="PURCHASE"
                onPress={() => purchaseBook()}
              />
            </View>
          </View>
        </ImageBackground>
        <View style={style.bottom}>
          <View style={style.tabHolder}>
            <TouchableOpacity
              style={[
                style.tab,
                isReview
                  ? {backgroundColor: '#F9FAFC'}
                  : {backgroundColor: Colors.Background},
              ]}
              onPress={() => onTabPress(false)}>
              <View>
                <Text
                  style={[
                    style.titleTab,
                    isReview ? {color: 'grey'} : {color: 'white'},
                  ]}>
                  Synopsis
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.tab,
                !isReview
                  ? {backgroundColor: '#F9FAFC'}
                  : {backgroundColor: Colors.Background},
              ]}
              onPress={() => onTabPress(true)}>
              <View>
                <Text
                  style={[
                    style.titleTab,
                    !isReview ? {color: 'grey'} : {color: 'white'},
                  ]}>
                  Reviews
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {isReview ? (
            <ReviewTab />
          ) : isBookLoadingSuccess ? (
            <SynopsisTab data={bookData} />
          ) : (
            <LottieView
              style={style.loadingLottie}
              source={require('../../../Asset/Animation/loading.json')}
              autoPlay
              loop
            />
          )}
        </View>
      </Animated.ScrollView>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={showReviewModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={style.modal}>
              <TouchableOpacity onPress={showReviewModal}>
                <Icon
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: 20,
                    marginRight: 20,
                  }}
                  name="close"
                  type="font-awesome"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', fontSize: 20}}>
                Review this book
              </Text>
              <View style={{height: 100, backgroundColor: 'white'}}>
                <Input
                  placeholder="Write a review"
                  multiline={true}
                  scrollEnabled={true}
                />
              </View>
              <Button
                style={{width: '85%', alignSelf: 'center', marginBottom: 20}}
                tittle="SUBMIT"
                onPress={() => {}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {isReview && (
        <TouchableOpacity onPress={showReviewModal}>
          <View style={style.reviewButton}>
            <Text style={style.reviewTitle}>WRITE A REVIEW</Text>
          </View>
        </TouchableOpacity>
      )}
      {showStatusPurchasing()}
    </View>
  );
};

export default DetailBookScreen;
