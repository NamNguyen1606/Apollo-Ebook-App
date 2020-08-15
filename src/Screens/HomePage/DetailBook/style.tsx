import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Utils/color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: Dimensions.get('window').height * 0.45,
    // alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  subHeader: {
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
  },
  middle: {
    height: 215,
    top: 150,
    left: 20,
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  tabHolder: {
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 15,
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
    height: 200,
    width: 140,
    borderRadius: 8,
  },
  detail: {
    marginLeft: 10,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.56,
  },
  title: {
    fontSize: 20,
    color: '#F6F6F6',
    fontWeight: 'bold',
  },
  titleTab: {
    fontSize: 16,
  },
  author: {
    fontSize: 15,
    color: '#E1E1E1',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F6F6F6',
  },
  reviewButton: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.Background,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  reviewTitle: {
    fontSize: 16,
    color: Colors.SubText,
    fontWeight: 'bold',
  },
  modal: {
    height: 350,
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  loadingLottie: {height: 100, width: 100, alignSelf: 'center'},
  boxIcon: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default style;
