import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-qr-code";

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
const timestampId=Date.now()+Math.floor(Math.random()*1000000)
export default function Index() {
  const params=useLocalSearchParams();
  let codeData = params?.codeData
  let splitSize = Math.ceil(codeData.length/Math.ceil(codeData.length/750))
  codeData = codeData?.match(new RegExp(`.{1,${splitSize}}`, 'g'));
  const [index,setIndex]=useState(0)
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight}}>
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <QRCode value={`${timestampId}-${codeData.length}-${index}@${codeData[index]}`}/>
        <View style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',maxWidth:'50%',marginTop:100}}>
          <Text suppressHighlighting={true} style={{...styles.boldText,flex:1,color:index===0?'grey':'white',textAlign:'left',marginLeft:10}} onPress={()=>{setIndex(index===0?index:index-1)}}>◀</Text>
          <Text suppressHighlighting={true} style={{...styles.boldText,marginRight:10}}>{index+1}</Text>
          <Text style={styles.boldText}>/</Text>
          <Text suppressHighlighting={true} style={{...styles.boldText,marginLeft:10}}>{codeData.length}</Text>
          <Text suppressHighlighting={true} style={{...styles.boldText,flex:1,color:index===codeData.length-1?'grey':'white',textAlign:'right',marginRight:10}} onPress={()=>{setIndex(index===codeData.length-1?index:index+1)}}>▶</Text>
        </View>
      </View>
      <View style={{...styles.row,backgroundColor: 'white',paddingTop:10,borderTopWidth:2}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={{...styles.boldText,color:'black'}}>{'Back'}</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
