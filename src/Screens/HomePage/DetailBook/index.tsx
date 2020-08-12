/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {Button} from '../../../Components';
import MoneyFormat from '../../../Utils/moneyFormat';
import Colors from '../../../Utils/color';
import ReviewTab from '../ReviewTab';
import SynopsisTab from '../Synopsis';
import {ScrollView} from 'react-native-gesture-handler';
import BookApi from '../../../Api/bookApi';
import {SharedElement} from 'react-navigation-shared-element';
import style from './style';
import LottieView from 'lottie-react-native';
import {useQuery} from 'react-query';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  navigation: any;
  route: any;
}

const DetailBookScreen: React.FC<Props> = (props) => {
  const {book} = props.route.params;
  const [isReview, setIsReview] = useState(false);
  const [img, setImg] = useState(book.imgUrl);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalPurchasingVisible, setIsModalPurchasingVisible] = useState<
    boolean
  >(false);
  const [token, setToken] = useState<string>('');
  const getPurchaseApi = async (key: any, token: any) =>
    await BookApi.purchaseBook(token, book.id);

  const {status, data}: any = useQuery(['purchase', token], getPurchaseApi);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';

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
    ['book', {Token}],
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
          {status === 'success' && (
            <View
              style={{
                height: 250,
                width: '70%',
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              {data.Success !== true ? (
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

          {status === 'error' && (
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

  function purchaseBook() {
    setIsModalPurchasingVisible(true);
    setToken(Token);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={style.header}
          resizeMode="cover"
          imageStyle={{opacity: 0.35}}
          source={{
            uri: img,
          }}
          onError={() => setImg(defaultImg)}>
          <View style={style.subHeader}>
            <Icon
              name="chevron-back"
              type="ionicon"
              color="white"
              size={33}
              onPress={() => {
                props.navigation.pop();
              }}
            />
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
          <View style={style.middle}>
            <SharedElement id={`item.${book.id}.photo`}>
              <Image
                style={{height: 220, width: 140, borderRadius: 8}}
                resizeMode="cover"
                source={{
                  uri: img,
                }}
                onError={() => setImg(defaultImg)}
              />
            </SharedElement>
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
                style={{borderRadius: 15, height: 45, width: 120}}
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
      </ScrollView>
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
