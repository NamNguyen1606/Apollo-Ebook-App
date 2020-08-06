/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../Utils/color';
import {useQuery} from 'react-query';
import PacketApi from '../../../Api/packetApi';
import {FlatList} from 'react-native-gesture-handler';
import {PacketCard} from '../../../Components';
import Route from '../../../Utils/router';
const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  navigation: any;
}

const BookshelfScreen: React.FC<Props> = (props) => {
  // function onItemPress(book: Book) {}
  const [index, setIndex] = useState(0);
  const packetData = useRef<any[]>([]);
  const indexData = useRef<number>(0);
  console.log(packetData.current.length);
  const loadingPacket = async (key: any, index: number) => {
    const res = await PacketApi.getPacket(Token, index * 10, 10, 0);
    return res;
  };

  const {data, status} = useQuery(['packets', index], loadingPacket);

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
            onEndReachedThreshold={0.7}
            onEndReached={loadingMore}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator color="black" size="large" />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: Colors.Background,
  },
  middle: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
});

export default BookshelfScreen;
