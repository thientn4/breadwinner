import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import defaultData from '../../support/defaultData';
import * as longTermStorage from '../../support/longTermStorage';

const styles=StyleSheet.create({
  column:{
    flex: 1,
    backgroundColor:"white",
    display:'flex',
    flexDirection:'column'
  },
  row:{
    display:'flex',
    flexDirection:'row',
    borderColor:'black',
    justifyContent:'space-between'
  },
  buttonInput:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
    borderRadius:20,
    height:40,
    overflow:'hidden',
    borderColor:'white',
    borderWidth:2,
    textAlign:'center',
    display:'flex',
    flexDirection:'row'
  },
  buttonIcon:{
    height:'100%',
    width:undefined,
    aspectRatio:1
  },
  typeFilter:{
    flex:1,
    alignItems:'center'
  },
  boldText:{
    fontWeight:'bold',
    fontSize:16
  }
})
const weekdays=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const meals=['Breakfast','Lunch','Dinner']
export default function Index() {
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  const [dishTypeFilter,setDishTypeFilter]=useState(-1)
  const [weekday,setWeekday]=useState(0)
  const [meal,setMeal]=useState(0)
  const [serving,setServing]=useState('1')
  const [filteredRecipes,setFilteredRecipes]=useState([])
  const [searchQuery,setSearchQuery]=useState('')
  const addPlan=async (recipeName)=>{
    let plan=await longTermStorage.retrieve('plan')
    if(plan){
      plan=JSON.parse(plan)
      let planSlot=plan[weekday][meal]
      for(let i=0; i<planSlot.length; i++)
        if(planSlot[i].name===recipeName){
          plan[weekday][meal][i].serving+=parseInt(serving)
          longTermStorage.store('plan',JSON.stringify(plan))
          Alert.alert('plan updated!','')
          return
        }
      plan[weekday][meal].push({name:recipeName, serving:parseInt(serving)})
      longTermStorage.store('plan',JSON.stringify(plan))
      Alert.alert('plan updated!','')
    }else{
      Alert.alert('There was an error. Please try again later.','')
    }
  }
  const filter=(dishType)=>{
    setSearchQuery('')
    Keyboard.dismiss()
    setDishTypeFilter(dishType)
  }
  useEffect(() => {
    const getRecipes = async()=>{
      let plan=await longTermStorage.retrieve('plan')
      if(!plan) longTermStorage.store('plan',JSON.stringify(defaultData.defaultPlan))

      let recipes = await longTermStorage.retrieve('recipes')
      if(recipes){
        recipes=JSON.parse(recipes)
      }else{
        recipes=defaultData.defaultRecipes
        longTermStorage.store('recipes',JSON.stringify(defaultData.defaultRecipes))
      }
      setFilteredRecipes(recipes.sort((a,b)=>a.name.localeCompare(b.name)))
    }
    getRecipes()
  },[useIsFocused()])
  return (
    <View style={styles.column}>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={()=>{Keyboard.dismiss;Alert.alert("We are still working on\nrecipe QR code scanner.\nCheck back later!",'')}}>
          <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/scan_btn.png')}/>
        </TouchableOpacity>
        <TextInput 
          style={{...styles.buttonInput, flex:1,marginRight:10,marginLeft:10,paddingLeft:20,paddingRight:20}} 
          placeholder="Search" 
          placeholderTextColor="grey"
          value={searchQuery}
          onChangeText={(text)=>{
            setDishTypeFilter(-1)
            setSearchQuery(text)
          }}
        />
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={()=>{router.navigate('/recipe')}}>
          <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderBottomWidth:2,backgroundColor:'white'}}>
        <TouchableOpacity  onPress={()=>filter(-1)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===-1?'black':'grey'}}>All</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(0)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===0?'black':'grey'}}>Apps</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(1)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===1?'black':'grey'}}>Main</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(2)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===2?'black':'grey'}}>Dessert</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(3)} style={{...styles.typeFilter,borderRightWidth:0}}><Text style={{...styles.boldText,color:dishTypeFilter===3?'black':'grey'}}>Other</Text></TouchableOpacity>
      </View>
      {filteredRecipes.length!==0 && <FlatList 
        style={styles.column}
        showsVerticalScrollIndicator={false}
        data={filteredRecipes}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            key = {index} 
            style={{
              ...styles.row,borderBottomWidth:2,borderColor:'grey',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10,
              display:(item.type===dishTypeFilter || (dishTypeFilter===-1 && item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())))?'flex':'none'
              //item.name.toLowerCase().includes(searchQuery)
            }}
            onPress={()=>{router.push({pathname:'/recipe',params:{recipe:JSON.stringify(item)}})}}
          >
            <Image style={{
              borderRadius:10,
              width:'25%',
              height:undefined,
              aspectRatio:1,
              marginRight:20
            }} source={{uri:'https://static01.nyt.com/images/2024/10/10/multimedia/KC-Pork-Chile-Verderex-kzbh/KC-Pork-Chile-Verderex-kzbh-mediumSquareAt3X.jpg'}}/>
            <View style={{...styles.row,flex:1}}>
              <View style={{...styles.column, justifyContent:'center'}}>
                <Text style={styles.boldText}>{item.name}</Text>
                <Text>{['Appetizer','Main course','Dessert'][item.type]}</Text>
                <Text style={{...styles.boldText,color:'grey',marginTop:10}}>{JSON.stringify(item.ingredients.length)} ingredients</Text>
              </View>
              <View style={{...styles.column, justifyContent:'center',flex:0}}>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>addPlan(item.name)}>
                  <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />}
      {filteredRecipes.length===0 && <View style={{...styles.column,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'grey'}}  onPress={()=>{router.navigate('/recipe')}}>Let's <Text style={{textDecorationLine:'underline'}}>add</Text> a new recipe!</Text>
      </View>}
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <View style={{...styles.buttonInput,alignSelf: 'flex-start'}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setWeekday(weekday===0?6:(weekday-1))}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,width:35, textAlign:'center'}}>{weekdays[weekday]}</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setWeekday(weekday===6?0:(weekday+1))}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttonInput,flex:1, marginLeft:10, marginRight:10}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setMeal(meal===0?2:(meal-1))}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>{meals[meal]}</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setMeal(meal===2?0:(meal+1))}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
        <TextInput 
          style={{...styles.buttonInput,aspectRatio:1,textAlign:'center'}} 
          placeholder='#' 
          placeholderTextColor="grey"
          keyboardType="number-pad"
          maxLength={2}
          value={serving}
          onChangeText={(text) => {setServing(text.replace(/[^0-9]/g, ''))}}
        />
      </View>
    </View>
  );
}
