import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultData from "../support/defaultData";
import * as longTermStorage from '../support/longTermStorage';

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
    height:35,
    textAlign:'center',
    display:'flex',
    flexDirection:'row'
  },
  typeFilter:{
    flex:1,
    alignItems:'center'
  },
  boldText:{
    fontWeight:'bold',
    fontSize:16, 
    textAlign:'center',
    color:'white'
  }
})
export default function Index() {
  const now=Date.now()
  const [expiration,setExpiration]=useState(null)
  let getExpriation=async ()=>{
    let data=await longTermStorage.retrieve('expiration')
    if(data)setExpiration(parseInt(data))
  }
  let roundDownEpoch=(timestamp)=>{
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }
  useEffect(()=>{
    getExpriation()
  },[useIsFocused()])
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight, alignItems: 'center'}}>
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        display:'flex',
        flexDirection:'column',
        width:'100%'
      }}>
        <View style={{borderColor:'rgb(58,58,58)',borderWidth:3,height:'50%',borderRadius:25,padding:10}}>
          <Image
            style={{
              height: 40,
              aspectRatio: 1,
              margin:'auto'
            }}
            source={require('../assets/images/premium_btn.png')}
          />
          <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            display:'flex',
            flexDirection:'column',
            padding:20,
            paddingTop:0
          }}>
            {((expiration||0)<now) && <Text style={{fontSize:65}}>$6</Text>}
            {((expiration||0)<now) && <Text style={{fontSize:20,margin:20}}>{`${defaultData.premiumLength/(24 * 60 * 60 * 1000)-1} days`}</Text>}
            <View>
              <View style={{height:'50%',backgroundColor:'rgb(254, 204, 109)',width:'100%',position:'absolute',bottom:0}}/>
              <Text style={{fontWeight:'bold',fontSize:20}}>Unlimited Access</Text>
            </View>
            {((expiration||0)>=now) && <Text style={{fontSize:20,margin:20}}>until</Text>}
            {((expiration||0)>=now) && <Text style={{fontWeight:'bold',fontSize:20}}>{(new Date(expiration)).toLocaleDateString()}</Text>}
          </View>
          {(expiration||0)<now && <TouchableOpacity style={{...styles.buttonInput,backgroundColor:'rgb(58,58,58)'}} onPress={async ()=>{
            if(!(await longTermStorage.retrieve('expiration'))){
              longTermStorage.store('expiration',`${roundDownEpoch(Date.now()+defaultData.premiumLength)}`)
              longTermStorage.remove('freeCount') //freeCount and premium must be reset at the same time
              alert('Premium successfully unlocked for this phone!')
              getExpriation()
              return
            }
            if(((expiration||0)>=now)) return
            longTermStorage.store('expiration',`${roundDownEpoch(Date.now()+defaultData.premiumLength)}`)
            longTermStorage.remove('freeCount') //freeCount and premium must be reset at the same time
            alert('Premium successfully unlocked for this phone!')
            getExpriation()
          }}><Text style={styles.boldText}>{expiration===null?'Start free trial':'Unlock'}</Text></TouchableOpacity>}
        </View>
      </View>
      <View style={{...styles.row,backgroundColor: 'white',paddingBottom:20}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={{...styles.boldText,color:'black'}}>Back</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
