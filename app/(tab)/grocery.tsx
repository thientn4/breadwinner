import { useHeaderHeight } from '@react-navigation/elements';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Alert, Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const screenHeight = Dimensions.get('window').height;
  const [newItem,setNewItem] = React.useState('');
  const [updated,setUpdated] = React.useState(true);
  const [grocery,setGrocery] = React.useState([]);
  const [groceryIndex,setGroceryIndex] = React.useState(0); 
  const [groceriesCount,setGroceriesCount] = React.useState(groceries.length); 
  useEffect(() => {
    const getGroceries = async()=>{
      let data = await longTermStorage.retrieve('groceries')
      if(data){
        groceries=JSON.parse(data)
      }else{
        longTermStorage.store('groceries',JSON.stringify(groceries))
      }
      setGrocery(groceries[groceryIndex])
      setGroceriesCount(groceries.length)
    }
    getGroceries()
  },[useIsFocused()])
  return (
    <View style={styles.column}>
      <View style={{flex:1}}>
        <KeyboardAvoidingView 
          style={{flex:1}}
          behavior={Platform.OS==="ios"?'padding':undefined}
          keyboardVerticalOffset={useHeaderHeight()+useSafeAreaInsets().bottom-30}
        >
          <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginRight:10}}  onPress={()=>{
              Alert.alert(
                "Are you sure you want to clear all items from this grocery list?","",
                [
                  {
                    text: "No",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      setGrocery([])
                      groceries[groceryIndex]=[]
                      longTermStorage.store('groceries',JSON.stringify(groceries))
                    },
                  },
                ],
                { cancelable: false } // Optional: prevents dismissing the alert by tapping outside (Android only)
              );
            }}>
              <Image style={{...styles.buttonIcon, height:'60%'}} source={require('../../assets/images/trash_btn.png')}/>
            </TouchableOpacity>
            <TextInput style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}} placeholder="Add to list" placeholderTextColor="grey" value={newItem} onChangeText={(text)=>{setNewItem(text)}}/>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginLeft:10}}  onPress={()=>{
              Keyboard.dismiss()
              for(let i=0; i<grocery.length; i++)
                if(grocery[i].name===newItem.trim().replace(/\s+/g, ' ').toLowerCase())
                  return Alert.alert(`You have already added '${grocery[i].name}'`,'')
              groceries[groceryIndex].push({
                name:newItem.trim().replace(/\s+/g, ' ').toLowerCase(),
                recipes:[],
                note:'',
                checked:false
              })
              setGrocery(groceries[groceryIndex])
              longTermStorage.store('groceries',JSON.stringify(groceries))
            }}>
              <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
            </TouchableOpacity>
          </View>
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
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                      {item.checked && <View style={{...styles.buttonInput,aspectRatio:1,backgroundColor:'black', height:20,borderColor:'none'}}/>}
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
                {item.recipes.map((e, subIndex) => <Text key = {subIndex}  style={{...styles.boldText,color:'grey',paddingLeft:12}}>8x Butter Chicken</Text>)}
                <TextInput 
                  style={{...styles.buttonInput, flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',height:100, marginTop:10,textAlignVertical: 'top'}} 
                  placeholder="Note"
                  placeholderTextColor="grey"
                  multiline = {true}
                  numberOfLines = {4}
                  onPress ={()=>{flatListRef?.current?.scrollToIndex({ index: index, animated: true })}}
                  onChangeText={()=>setUpdated(false)}
                />
              </View>
            )}
          />}
          {grocery.length===0 && <View style={{...styles.column,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'grey'}}>Empty grocery list</Text>
          </View>}
        </KeyboardAvoidingView>
        {!updated && <View style={{...styles.row,width:'100%', position:'absolute',bottom:0,alignSelf: 'flex-start',justifyContent:'center'}}>
          <TouchableOpacity style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',paddingLeft:20,paddingRight:20, margin:10, marginTop:0,borderWidth:0,alignSelf: 'flex-start'}} onPress={()=>{setUpdated(true)}}>
            <Text style={{...styles.boldText,color:'white'}}>update +</Text>
          </TouchableOpacity>
        </View>}
      </View>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginRight:10}}  onPress={()=>{Keyboard.dismiss;Alert.alert("We are still working on\nshopping list QR code scanner.\nCheck back later!",'')}}>
          <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/scan_btn.png')}/>
        </TouchableOpacity>
        <View style={{...styles.buttonInput, flex:1}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{
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
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,display:groceryIndex===groceriesCount-1?'flex':'none'}} onPress={()=>{
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
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,marginLeft:10}}  onPress={()=>{}}>
          <Image style={{...styles.buttonIcon, height:'65%'}} source={require('../../assets/images/build_btn.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
