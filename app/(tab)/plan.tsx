import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import defaultData from "../../support/defaultData";
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
    borderTopWidth:2,
    borderRightWidth:2,
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
  const [planItems,setPlanItems]=useState([[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]])
  useEffect(()=>{
    const getPlan = async()=>{
      let plan=await longTermStorage.retrieve('plan')
      if(plan)plan=JSON.parse(plan)
      else {
        plan=defaultData.defaultPlan
        longTermStorage.store('plan',JSON.stringify(defaultData.defaultPlan))
      }
      setPlanItems(plan)
    }
    getPlan()
  },[useIsFocused()])
  const clearPlan=()=>{
    Alert.alert(
      "Are you sure, you want to clear your current plan?","",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: async () => {
            longTermStorage.store('plan',JSON.stringify(defaultData.defaultPlan))
            setPlanItems(defaultData.defaultPlan)
          },
        },
      ],
      { cancelable: false } // Optional: prevents dismissing the alert by tapping outside (Android only)
    );
  }
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
          {['Clear','MON','TUE','WED','THU','FRI','SAT','SUN'].map((weekday, index) => 
            <View key = {index} style={index===0?styles.row:{...styles.row,minHeight:screenHeight/8-10}}>
              <View style={{...styles.cell,borderTopWidth:index===0?0:2}}>
                <Text style={{...styles.boldText,color:'grey',padding:10,textDecorationLine:index===0?'underline':'none'}} onPress={()=>{if(index===0)clearPlan()}}>{weekday}</Text>
              </View>
              {['Breakfast','Lunch','Dinner'].map((mealType, subIndex) => 
                <View key={subIndex} style={{...styles.cell,width:screenWidth/2-40,borderTopWidth:index===0?0:2}}>
                  {index===0 && <Text style={{...styles.boldText,color:'grey',padding:10}}>{mealType}</Text>}
                  {index!==0 && planItems[index-1][subIndex].map((weekday, planIndex) => 
                    <TouchableOpacity key={planIndex} style={{...styles.cellItem,width:screenWidth/2-46}} onPress={async ()=>{
                      let data = await longTermStorage.retrieve('recipes')
                      if(data){
                        data=JSON.parse(data)
                        for(let i=0; i<data.length; i++){
                          if(data[i].name===weekday.name){
                            router.push({pathname:'/recipe',params:{recipe:JSON.stringify(data[i])}})
                            return
                          }
                        }
                      }  
                      Alert.alert('Cannot find this recipe!','')
                    }}>
                      <Text>{weekday.name}</Text>
                      <View style={styles.row}>
                        <Text style={{...styles.boldText,color:'grey'}}>{weekday.serving}x</Text>
                        <Text style={{...styles.boldText,color:'grey',paddingTop:0,textAlign:'right'}} onPress={async ()=>{
                          let plan=await longTermStorage.retrieve('plan')
                          if(!plan)return Alert.alert('There was an error. Please try again later.','')
                          plan=JSON.parse(plan)
                          plan[index-1][subIndex]=plan[index-1][subIndex].filter((item) => item.name !== weekday.name)
                          longTermStorage.store('plan',JSON.stringify(plan))
                          setPlanItems(plan)
                        }}>remove</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={{...styles.cell,borderRightWidth:0,borderTopWidth:index===0?0:2}}>
                <Text style={{...styles.boldText,color:'grey',padding:10,textDecorationLine:index===0?'underline':'none'}}  onPress={()=>{if(index===0)clearPlan()}}>{weekday}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
