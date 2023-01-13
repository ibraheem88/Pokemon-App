import { getActionFromState } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

const Home = props => {
  const [pokemons, setPokemons] = useState([]);
  const [view, setView] = useState("Grid");
  const[images,setImages]=useState([])
  const[favorites,setFavorites]=useState([])
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Ascending");
  const [value2, setValue2] = useState("Ascending");
  const [items, setItems] = useState([
    {label: 'Ascending', value: 'Ascending'},
    {label: 'Descending', value: 'Descending'}
  ]);
  const [items2, setItems2] = useState([
    {label: 'Grid', value: 'Grid'},
    {label: 'List', value: 'List'}
  ]);

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function dynamicSortReverse(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
      return result * sortOrder;
  }
}

  const fetchPokemon = () => {
    console.log('Called');
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results.sort(dynamicSort("name")))
        console.log(data.results.sort(dynamicSort("name")))
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  getInfo=async(url)=>{
    try{
      const res=await fetch(url)
      const info=await res.json()
      setImages([...images,info.sprites.front_default])
    }
catch(err){
  console.log(err)
}

  }
  handleFavorite=(item)=>{
    if(favorites.includes(item.name)){
      const newFilter=favorites.filter((fav)=>item.name!==fav)
      setFavorites(newFilter)
    }else{
      setFavorites([...favorites,item.name])
    }
    
  }

  useEffect(()=>{
    props.navigation.setOptions({
      headerRight:()=>(
        <Pressable onPress={()=>props.navigation.navigate('Favorites',{favorites: favorites})} style={{marginRight:10,padding:10}}>
        <Text style={{fontWeight:"bold",color:'blue'}}>Favorites</Text>
        </Pressable>
      )});
  },[props.navigation,favorites])

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    const newArr=Object.assign([], pokemons)
    if(value==="Ascending"){
      setPokemons(newArr.sort(dynamicSort("name")))
    }
    else if(value==="Descending"){
      setPokemons(newArr.reverse())
    }
  }, [value]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Pressable style={{alignSelf:'center',padding:15,backgroundColor:'lightblue',borderRadius:4,marginTop:20,width:'80%'}}
        onPress={()=>{
          if(view==="Grid"){
            setView("List")
          }else{
            setView("Grid")
          }
        }}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>{view}</Text>
        </Pressable>
        <TextInput
          onFocus={() => props.navigation.navigate('Search')}
          placeholder="Search Pokemons"
          placeholderTextColor={"black"}
          style={{
            padding: 15,
            backgroundColor: '#eee',
            marginVertical: 5,
            marginTop: 20,
            borderRadius: 4,
          }}
        />
        <DropDownPicker
        style={{width:'50%',marginVertical:10}}
        placeholder="Sort By"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

       <FlatList
          contentContainerStyle={{}}
          key={view==="Grid" ? '_' : '#'}
          numColumns={view==="Grid" ? 3 : 1}
          data={pokemons}
          renderItem={({item}) => (
            <View
              style={{
                padding: 10,
                flex:1,
                marginVertical: 10,
                marginRight: 10,
                alignItems: 'center',
                borderColor: 'lightgrey',
                borderWidth: 3,
                borderRadius: 5,
              }}
              >
              <Pressable
                onPress={() => handleFavorite(item)}
                style={{alignSelf: 'flex-end'}}>
                <Ionicons name={favorites.includes(item.name) ? "heart" : "heart-outline"} color="red" size={22} />
              </Pressable>
              <TouchableOpacity
              onPress={()=>props.navigation.navigate("Detail",{name: item.name})}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrabYz1A8dedSJCFjqiMPJF81tARLIQrRlPw&usqp=CAU",
                }}
              />
              </TouchableOpacity>
              <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
              </View>
          )}
        /> 
      </View>
    </SafeAreaView>
  );
};

export default Home;
