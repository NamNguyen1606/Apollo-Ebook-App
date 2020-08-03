/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Book from '../../../Models/book';
import Colors from '../../../Utils/color';
import {BookScrollView} from '../../../Components';

interface Props {
  data: Book;
  suggestionData: any;
  // navigation: any;
  // onSuggestionBook?: (book: any) => void;
}

const SynopsisTab: React.FC<Props> = (props) => {
  return (
    <View style={style.container}>
      <Text style={[style.title, {marginTop: 0}]}>Information</Text>
      <View style={style.bookInfoHolder}>
        <TitleCard title="Publish" data={props.data.publicYear} />
        <TitleCard
          title="Authors"
          data={`${props.data.author}, ${props.data.authorMore} `}
        />
        <TitleCard title="Subject" data={props.data.subject} />
        <TitleCard title="Pages" data={props.data.page} />
      </View>
      <Text style={style.title}>Summary</Text>
      <Text style={style.summaryStyle}>{props.data.summary}</Text>
      <Text style={style.title}>Suggestion</Text>
      {props.suggestionData !== null && props.suggestionData !== [] ? (
        <BookScrollView
          key={1}
          title="Suggestion"
          books={props.suggestionData}
          onItemPress={(book) => console.log(book)}
          onMorePress={() => {}}
        />
      ) : null}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  summaryStyle: {
    fontSize: 16,
    color: Colors.DarkGrey,
    lineHeight: 22,
  },
  bookInfoHolder: {
    borderColor: 'black',
    borderWidth: 0.15,
  },
  subInfoStyleTitle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  subInfoStyleData: {
    borderLeftWidth: 0.5,
    borderBottomColor: 'black',
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
});

export default SynopsisTab;

interface SubProps {
  title: string;
  data: number | string;
}
const TitleCard: React.FC<SubProps> = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          flex: 1,
          backgroundColor: '#EFEFEF',
          textAlign: 'center',
          paddingVertical: 8,
          fontSize: 15,
          color: 'black',
          fontWeight: '600',
        }}>
        {props.title}
      </Text>
      <Text style={{flex: 2, marginLeft: 20, fontSize: 15, color: 'black'}}>
        {props.data}
      </Text>
    </View>
  );
};
