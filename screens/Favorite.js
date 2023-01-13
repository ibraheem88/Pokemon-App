import * as React from 'react';
import {Text, View, TouchableOpacity, Image,ScrollView,FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useLinkProps } from '@react-navigation/native';

export default function Favorite(props) {
    console.log(props.route.params.favorites)
  return (
    <View style={{flex:1,padding:20}}>
     <FlatList
          contentContainerStyle={{flex:1}}
          numColumns={3}
          ListEmptyComponent={(<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
            <Text style={{fontWeight:'bold'}}>No Favorites</Text>
            </View>)}
          data={props.route.params.favorites}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: 10,
                marginVertical: 10,
                marginRight: 10,
                alignItems: 'center',
                borderColor: 'lightgrey',
                borderWidth: 3,
                borderRadius: 5,
              }}
              onPress={()=>props.navigation.navigate('Detail',{name: item})} >
              <Image
                style={{
                  width: 70,
                  height: 70,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrabYz1A8dedSJCFjqiMPJF81tARLIQrRlPw&usqp=CAU",
                }}
              />
              <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
  );
}