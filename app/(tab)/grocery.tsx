import { useRouter } from "expo-router";
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
  }
})
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.column}>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <TextInput style={{...styles.buttonInput, flex:1,marginRight:10,paddingLeft:20,paddingRight:20}} placeholder="Add to grocery" placeholderTextColor="grey"></TextInput>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
          <Image style={styles.buttonIcon} source={require('../../assets/images/add_btn.png')}/>
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
                <Image style={{...styles.buttonIcon}} source={require('../../assets/images/delete_btn.png')}/>
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
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <TouchableOpacity style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}}>
          <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>Filter</Text>
          <Text style={styles.boldText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
