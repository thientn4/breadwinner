import { tempStorage } from "@/support/tempStorage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    textAlign:'center'
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
  cell:{
    borderColor:'rgb(232,232,232)',
    borderWidth:1,
    width:100,
    alignItems:'center'
  },
  cellItem:{
    backgroundColor:'white',
    borderRadius:10,
    padding:3,
    margin:2,
    borderColor:'black',
    borderWidth:2,
    textAlign:'left'
  }
})
export default function Index() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  const [plan,setPlan]=useState([[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]])
  useEffect(()=>{
    const getPlan = async()=>{
      let data=await longTermStorage.retrieve('plan')
      if(!data) longTermStorage.store('plan',JSON.stringify(tempStorage.plan))
      else tempStorage.plan=JSON.parse(data)
      setPlan(tempStorage.plan)
    }
    getPlan()
  },[tempStorage.plan])
  return (
    <View style={{...styles.column,borderTopWidth:2, borderBottomWidth:2}}>
      <ScrollView 
        style={{flex:1}} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      > 
        <ScrollView 
          style={styles.column}
          showsVerticalScrollIndicator={false}
        >
          {['','MON','TUE','WED','THU','FRI','SAT','SUN'].map((weekday, index) => 
            <View key = {index} style={index===0?styles.row:{...styles.row,minHeight:screenHeight/8-10}}>
              <View style={styles.cell}><Text style={{...styles.boldText,color:'grey',padding:10}}>{weekday}</Text></View>
              {['Breakfast','Lunch','Dinner'].map((mealType, subIndex) => 
                <View key={subIndex} style={{...styles.cell,width:screenWidth/2-40}}>
                  {index===0 && <Text style={{...styles.boldText,color:'grey',padding:10}} onPress={async ()=>{console.log(`hello ${(await longTermStorage.retrieve('plan'))}`)}}>{mealType}</Text>}
                  {index!==0 && plan[index-1][subIndex].map((weekday, planIndex) => 
                    <TouchableOpacity key={planIndex} style={{...styles.cellItem,width:screenWidth/2-46}} onPress={async ()=>{
                      if(tempStorage.recipes===null){
                        let data = await longTermStorage.retrieve('recipes')
                        if(data)tempStorage.recipes=JSON.parse(data)
                      }
                      if(tempStorage.recipes!==null){
                        for(let i=0; i<tempStorage.recipes.length; i++){
                          if(tempStorage.recipes[i].name===weekday.name){
                            router.push({pathname:'/recipe',params:{recipe:JSON.stringify(tempStorage.recipes[i])}})
                            return
                          }
                        }
                      }
                      Alert.alert('This recipe is not available','')
                    }}>
                      <Text><Text style={{...styles.boldText,color:'grey'}}>{weekday.serving}x</Text> {weekday.name}</Text>
                      <Text><Text style={{...styles.boldText,color:'grey',paddingTop:0,textAlign:'right'}} onPress={()=>{}}>remove</Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.cell}><Text style={{...styles.boldText,color:'grey',padding:10}}>{weekday}</Text></View>
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
