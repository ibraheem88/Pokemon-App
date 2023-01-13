import * as React from 'react';
import {Text, View, TouchableOpacity, Image,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SearchItem({response}) {
  return (
    <ScrollView
    contentContainerStyle={{ paddingBottom:20,flexGrow:1}}
      onPress={() => {}}>
       <View style={{paddingHorizontal:20,paddingBottom:20}}>
      <Image
        source={{
          uri: response?.sprites?.front_default,
        }}
        style={{height: 200, width: 200,alignSelf:'center'}}
      />
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize: 16,fontWeight:'bold'}}>Name:</Text>
      <Text style={{fontSize: 16,marginLeft:10}}>{response?.name?.charAt(0).toUpperCase() + response?.name?.slice(1)}</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:10}}>
      <Text style={{fontSize: 16,fontWeight:'bold'}}>Abilities:</Text>
      {response?.abilities?.map((item)=>
        <Text style={{fontSize: 16,marginLeft:10}} key={item.ability.name}>{item.ability.name?.charAt(0).toUpperCase() + item.ability.name.slice(1)}</Text>
      )}
      </View>
      <View style={{marginTop:10,flex:1}}>
      <Text style={{fontSize: 16,fontWeight:'bold'}}>Moves:</Text>
      {response?.moves?.map((item)=>
        <Text style={{fontSize: 16,marginLeft:10,marginTop:8}} key={item.move.name}>⊛ {item.move.name.charAt(0).toUpperCase() + item.move.name.slice(1)}</Text>
      )}
      </View>
      </View>
    </ScrollView>
  );
}
