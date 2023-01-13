import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import SearchItem from '../components/SearchItem';

const SearchScreen = props => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState([]);

  const searchPokemon = () => {
    const base_url="https://pokeapi.co/api/v2/pokemon/"+text.toLocaleLowerCase()
    console.log(base_url);
    fetch(base_url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setResponse(data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <View style={{padding: 10, height: '100%', backgroundColor: 'white'}}>
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Search Pokemons"
        style={{
          padding: 15,
          backgroundColor: '#eee',
          marginVertical: 5,
          marginTop: 10,
          borderRadius: 4,
        }}
      />
      <TouchableOpacity style={{padding:10,backgroundColor:'lightblue',width:100,alignItems:'center',borderRadius:4,alignSelf:'center',marginTop:10}}
      onPress={()=>searchPokemon()}>
        <Text>Search</Text>
      </TouchableOpacity>
      {response?.name &&
      <View style={{flex:1}}>
          <SearchItem
            response={response}
            key={response}
            navigation={props.navigation}
          />
        </View>
        }
    </View>
  );
};

export default SearchScreen;
