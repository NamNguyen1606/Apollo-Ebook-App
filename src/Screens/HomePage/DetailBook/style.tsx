import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Utils/color';
import {vs, hs, ms} from '../../../Utils/Scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: Dimensions.get('window').height * 0.45,
    backgroundColor: 'black',
  },
  subHeader: {
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: vs(20),
    height: vs(70),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
  },
  middle: {
    height: vs(200),
    top: vs(110),
    left: hs(20),
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    paddingHorizontal: hs(20),
    paddingTop: vs(30),
  },
  tabHolder: {
    height: vs(45),
    marginTop: vs(10),
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: vs(5),
    marginBottom: vs(15),
  },
  tab: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  img: {
    height: vs(200),
    width: hs(140),
    borderRadius: vs(8),
  },
  detail: {
    marginLeft: hs(14),
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
  },
  title: {
    fontSize: ms(19),
    color: '#F6F6F6',
    fontWeight: 'bold',
  },
  titleTab: {
    fontSize: ms(16),
  },
  author: {
    fontSize: ms(15),
    color: '#E1E1E1',
  },
  price: {
    fontSize: ms(22),
    fontWeight: 'bold',
    color: '#F6F6F6',
  },
  reviewButton: {
    height: vs(50),
    borderWidth: 1,
    borderColor: Colors.Background,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vs(10),
    marginHorizontal: hs(20),
  },
  reviewTitle: {
    fontSize: ms(16),
    color: Colors.SubText,
    fontWeight: 'bold',
  },
  modal: {
    height: vs(350),
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: vs(20),
  },
  loadingLottie: {height: vs(100), width: vs(100), alignSelf: 'center'},
  boxIcon: {
    height: vs(50),
    width: vs(50),
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vs(15),
  },
  btnPurchase: {borderRadius: vs(15), height: vs(45), width: hs(120)},
  lottieStatus: {
    height: vs(100),
    width: vs(100),
    alignSelf: 'center',
  },
  headerModal: {
    height: vs(250),
    width: hs(220),
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default style;
