import { useRouter } from "expo-router";
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
  typeFilter:{
    flex:1,
    alignItems:'center'
  },
  boldText:{
    fontWeight:'bold',
    fontSize:16
  }
})
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.column}>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,paddingBottom:0,borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <TouchableOpacity style={{...styles.buttonInput, flex:1,marginRight:10,paddingLeft:20,paddingRight:20}}><Text style={styles.boldText}>Filter</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
          <Image style={styles.buttonIcon} source={require('../assets/images/reload_btn.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <TextInput style={{...styles.buttonInput, flex:1,marginRight:10,paddingLeft:20,paddingRight:20}} placeholder="Add to grocery" placeholderTextColor="grey"></TextInput>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
          <Image style={styles.buttonIcon} source={require('../assets/images/add_btn.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView 
        style={styles.column}
        showsVerticalScrollIndicator={false}
      >
        {[...Array(10)].map((e, index) => 
          <View key = {index} style={{...styles.column, padding:10}}>
            <View style={{...styles.row,flex:1, paddingBottom:10}}>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                <View style={{...styles.buttonInput,aspectRatio:1,backgroundColor:'black', height:20}}/>
              </TouchableOpacity>
              <View style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10,marginLeft:10}}>
                <Text style={styles.boldText}>curry powder</Text>
              </View>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                <Image style={{...styles.buttonIcon}} source={require('../assets/images/delete_btn.png')}/>
              </TouchableOpacity>
            </View>
            {[...Array(3)].map((e, index) => <Text key = {index}  style={{...styles.boldText,color:'grey',paddingLeft:12}}>8x Butter Chicken</Text>)}
            <TextInput 
              style={{...styles.buttonInput, flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',height:100, marginTop:10,textAlignVertical: 'top'}} 
              placeholder="Note"
              placeholderTextColor="grey"
              multiline = {true}
              numberOfLines = {4}
            ></TextInput>
          </View>
        )}
      </ScrollView>
      <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderTopWidth:2}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.navigate('/menu')}}><Text style={styles.boldText}>Menu</Text></TouchableOpacity>
        <View style={{borderColor:'black',borderRightWidth:2}}></View>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.navigate('/plan')}}><Text style={styles.boldText}>Plan</Text></TouchableOpacity>
        <View style={{borderColor:'black',borderRightWidth:2}}></View>
        <TouchableOpacity style={{...styles.typeFilter,borderRightWidth:0}} onPress={()=>{router.navigate('/grocery')}}><Text style={{...styles.boldText,textDecorationLine: 'underline'}}>Grocery</Text></TouchableOpacity>
      </View>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <TouchableOpacity style={{...styles.buttonInput,borderColor:'white',paddingLeft:10,paddingRight:10,flex:1,marginRight:10,marginLeft:10}}>
          <Text style={styles.boldText}>ntmthien01@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
          <Image style={styles.buttonIcon} source={require('../assets/images/reload_btn.png')}/>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ backgroundColor: 'rgb(58,58,58)',paddingBottom: StatusBar.currentHeight}}/>
    </View>
  );
}
