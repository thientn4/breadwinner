import { router } from "expo-router";
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
              height: 60,
              aspectRatio: 1,
              margin:'auto'
            }}
            source={require('../assets/images/icon.png')}
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
            <Text style={{fontSize:65}}>$6</Text>
            <Text style={{fontSize:20,margin:20}}>30 days</Text>
            <View>
              <View style={{height:'50%',backgroundColor:'rgb(204,255,102)',width:'100%',position:'absolute',bottom:0}}/>
              <Text style={{fontWeight:'bold',fontSize:20}}>Unlimited Access</Text>
            </View>
            {/* <Text style={{fontSize:20,margin:20}}>until</Text>
            <Text style={{fontWeight:'bold',fontSize:20}}>02/02/2032</Text> */}
          </View>
          <TouchableOpacity style={{...styles.buttonInput,backgroundColor:'rgb(58,58,58)'}}><Text style={styles.boldText}>Unlock</Text></TouchableOpacity>
        </View>
      </View>
      <View style={{...styles.row,backgroundColor: 'white',paddingBottom:20}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={{...styles.boldText,color:'black'}}>{'Back'}</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
