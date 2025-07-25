import { useHeaderHeight } from '@react-navigation/elements';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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
  boldText:{
    fontWeight:'bold',
    fontSize:16
  },
  typeFilter:{
    flex:1,
    alignItems:'center'
  },
})
let groceries=[[]]
export default function Index() {
  const flatListRef = useRef(null);
  const [newItem,setNewItem] = React.useState('');
  const [updated,setUpdated] = React.useState(true);
  const [grocery,setGrocery] = React.useState([]);
  const [groceryIndex,setGroceryIndex] = React.useState(0); 
  const [groceriesCount,setGroceriesCount] = React.useState(groceries.length); 
  useEffect(() => {
    const getGroceries = async()=>{
      let data = await longTermStorage.retrieve('groceries')
      if(data) groceries=JSON.parse(data)
      else longTermStorage.store('groceries',JSON.stringify(groceries))
      setGrocery(groceries[groceryIndex])
      setGroceriesCount(groceries.length)
      setUpdated(true)
    }
    getGroceries()
  },[useIsFocused()])
  return (
    <View style={styles.column}>
      <View style={{flex:1}}>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
          <View style={{...styles.buttonInput,aspectRatio:1,marginRight:10}}><Text>{grocery.length<99?grocery.length:'99+'}</Text></View>
          <TextInput style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}} placeholder="Add to list" placeholderTextColor="grey" value={newItem} onChangeText={(text)=>{setNewItem(text)}}/>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginLeft:10}}  onPress={()=>{
            setNewItem('')
            Keyboard.dismiss()
            let processedItem=newItem.trim().replace(/\s+/g, ' ').toLowerCase()
            if(processedItem==='')return
            for(let i=0; i<grocery.length; i++)
              if(grocery[i].name===processedItem)
                return Alert.alert(`You have already added '${grocery[i].name}'`,'')
            let newItemObj={
              name:processedItem,
              recipes:[],
              note:'',
              checked:false
            }
            groceries[groceryIndex]=[newItemObj,...groceries[groceryIndex]]
            groceries[groceryIndex].sort((a,b)=>a.name.localeCompare(b.name))
            setGrocery(groceries[groceryIndex])
            longTermStorage.store('groceries',JSON.stringify(groceries))
          }}>
            <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView 
          style={{flex:1}}
          behavior={Platform.OS==="ios"?'padding':'height'}
          keyboardVerticalOffset={useHeaderHeight()}
        >
          {grocery.length!==0 && <FlatList 
            ref={flatListRef}
            style={styles.column}
            contentContainerStyle ={{paddingBottom:updated?10:60}}
            showsVerticalScrollIndicator={false}
            data={grocery}
            renderItem={({ item, index }) => (
              <View  key = {index} style={{...styles.column, padding:10, paddingBottom:0}}>
                <TouchableWithoutFeedback   style={{flex:1}} onPress={Keyboard.dismiss}>
                  <View style={{...styles.row,flex:1, paddingBottom:10}}>
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{
                      groceries[groceryIndex][index].checked=!groceries[groceryIndex][index].checked
                      setGrocery([...groceries[groceryIndex]])
                      longTermStorage.store('groceries',JSON.stringify(groceries))
                    }}>
                      {item.checked && <View style={{...styles.buttonInput,aspectRatio:1,backgroundColor:'rgb(58,58,58)', height:20,borderWidth:0}}/>}
                    </TouchableOpacity>
                    <View style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10,marginLeft:10}}>
                      <Text style={styles.boldText}>{item.name}</Text>
                    </View>
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{
                      groceries[groceryIndex]=groceries[groceryIndex].filter((itemFilter)=>item.name!==itemFilter.name)
                      setGrocery(groceries[groceryIndex])
                      longTermStorage.store('groceries',JSON.stringify(groceries))
                    }}>
                      <Image style={{...styles.buttonIcon}} source={require('../../assets/images/delete_btn.png')}/>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback  >
                {item.recipes.map((ingredientRecipe, subIndex) => <Text key = {subIndex}  style={{...styles.boldText,color:'grey',paddingLeft:12}}>{ingredientRecipe}</Text>)}
                <TextInput 
                  style={{...styles.buttonInput, flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',height:100, marginTop:item.recipes.length===0?0:10,textAlignVertical: 'top'}} 
                  placeholder="Note"
                  placeholderTextColor="grey"
                  multiline = {true}
                  numberOfLines = {4}
                  onPress ={()=>{flatListRef?.current?.scrollToIndex({ index: index, animated: true })}}
                  defaultValue={item.note}
                  onChangeText={(text)=>{
                    groceries[groceryIndex][index].note = text.replace(/(\s)\1+/g, '$1')
                    setUpdated(false)
                  }}
                />
              </View>
            )}
          />}
          {grocery.length===0 && <View style={{...styles.column,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'grey'}}>Empty grocery list</Text>
          </View>}
        </KeyboardAvoidingView>
        {!updated && <View style={{...styles.row,width:'100%', position:'absolute',bottom:0,alignSelf: 'flex-start',justifyContent:'center'}}>
          <TouchableOpacity style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',paddingLeft:20,paddingRight:20, margin:10, marginTop:0,borderWidth:0,alignSelf: 'flex-start'}} onPress={()=>{
            longTermStorage.store('groceries',JSON.stringify(groceries))
            setUpdated(true)
          }}>
            <Text style={{...styles.boldText,color:'white'}}>update +</Text>
          </TouchableOpacity>
        </View>}
      </View>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginRight:10}}  onPress={()=>{
          Alert.alert(
            `Are you sure you want to delete grocery list #${groceryIndex+1}?`,"",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: () => {
                  if(groceries.length===1)
                    groceries=[[]]
                  else
                    groceries.splice(groceryIndex, 1);
                  longTermStorage.store('groceries',JSON.stringify(groceries))
                  setGrocery(groceries[0])
                  setGroceryIndex(0)
                  setGroceriesCount(groceries.length)
                },
              },
            ],
            { cancelable: false } // Optional: prevents dismissing the alert by tapping outside (Android only)
          );
        }}>
          <Image style={{...styles.buttonIcon, height:'60%'}} source={require('../../assets/images/trash_btn.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginRight:10}}  onPress={()=>{Keyboard.dismiss;Alert.alert("We are still working on\ngrocery QR code scanner.\nCheck back later!",'')}}>
          <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/qr_btn.png')}/>
        </TouchableOpacity>
        <View style={{...styles.buttonInput, flex:1}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,opacity:groceryIndex<=0?0.3:1}} onPress={()=>{
            if(groceryIndex<=0)return
            setGrocery(groceries[groceryIndex-1])
            setGroceryIndex(groceryIndex-1)
          }}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>List {groceryIndex+1}/{groceriesCount}</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,display:groceryIndex<groceriesCount-1?'flex':'none'}} onPress={()=>{
            if(groceryIndex>=groceriesCount-1)return
            setGrocery(groceries[groceryIndex+1])
            setGroceryIndex(groceryIndex+1)
          }}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,display:groceryIndex===groceriesCount-1?'flex':'none',opacity:groceries.length>=5?0.3:1}} onPress={()=>{
            if(groceries.length>=5)return
            for(let i=0;i<groceries.length;i++){
              if(groceries[i].length===0){
                Alert.alert(`List #${i+1} is still empty. Please use it first!`)
                setGrocery(groceries[i])
                setGroceryIndex(i)
                return
              }
            }
            groceries.push([])
            setGrocery(groceries[groceryIndex+1])
            setGroceriesCount(groceriesCount+1)
            setGroceryIndex(groceryIndex+1)
            longTermStorage.store('groceries',JSON.stringify(groceries))
          }}>
            <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/add_btn.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginLeft:10}}  onPress={()=>{Keyboard.dismiss;Alert.alert("We are still working on\ngrocery QR code scanner.\nCheck back later!",'')}}>
          <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/scan_btn.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginLeft:10}}  onPress={async ()=>{
          Alert.alert(
            "Are you sure, you want to rebuild this grocery list?","",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: async () => {
                  let recipes=await longTermStorage.retrieve('recipes')
                  if(recipes)recipes=JSON.parse(recipes)
                  let plan=await longTermStorage.retrieve('plan')
                  if(plan)plan=JSON.parse(plan)
                  if(recipes && plan){
                    let plannedServings={}
                    for(let i=0;i<plan.length;i++){
                      for(let j=0;j<plan[i].length;j++){
                        for(let k=0;k<plan[i][j].length;k++){
                          if(!plannedServings[plan[i][j][k].name]){
                            plannedServings[plan[i][j][k].name]=0
                          }
                          plannedServings[plan[i][j][k].name]+=plan[i][j][k].serving
                        }
                      }
                    }
                    let groceryList=[]
                    let groceryListIndex={}
                    for(let i=0;i<recipes.length;i++){
                      if(!plannedServings[recipes[i].name])continue
                      for(let j=0;j<recipes[i].ingredients.length;j++){
                        let ingredient=recipes[i].ingredients[j]
                        if(ingredient.name in groceryListIndex){
                          groceryList[groceryListIndex[ingredient.name]].recipes.push(`${plannedServings[recipes[i].name]}x ${recipes[i].name}`)
                        }else{
                          groceryListIndex[ingredient.name]=groceryList.length
                          groceryList.push({
                            name:ingredient.name,
                            recipes:[`${plannedServings[recipes[i].name]}x ${recipes[i].name}`],
                            note:'',
                            checked:false
                          })
                        }
                      }
                    }
                    if(groceryList.length===0)return Alert.alert("We found no meal plan to build grocery list",'')
                    groceries[groceryIndex]=groceryList
                    setGrocery(groceryList)
                    longTermStorage.store('groceries',JSON.stringify(groceries))
                    setUpdated(true)
                  }else{
                    return Alert.alert("Failed to collect recipes and plan to build grocery list. Try again later!",'')
                  }
                },
              },
            ],
            { cancelable: false } // Optional: prevents dismissing the alert by tapping outside (Android only)
          );
        }}>
          <Image style={{...styles.buttonIcon, height:'65%'}} source={require('../../assets/images/build_btn.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
