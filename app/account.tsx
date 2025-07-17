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
    alignItems:'center',
    borderColor:'black',
    borderRightWidth:2
  },
  boldText:{
    fontWeight:'bold',
    fontSize:16
  },
  recipeInfoTable:{
    maxHeight:200,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'white',
    borderRadius:20,
    borderWidth:2,
    borderColor:'white'
  }
})
export default function Index() {
  const router = useRouter();
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(58,58,58)', paddingBottom: StatusBar.currentHeight}}>
      <View 
        style={styles.column}
      >
        <View style={{...styles.column, justifyContent:'center', alignItems:'center'}}>
          <Image style={{
            width:130,
            height:undefined,
            aspectRatio:1,
            borderRadius:130,
            borderColor:'black',
            borderWidth:2
          }} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8Ndh_6Yi1w8G7Yg5iGtCQQVreP5sWLdUbg&s"}}/>
          <Text style={{...styles.boldText,marginTop:30}}>ntmthien01@gmail.com</Text>
          <View style={{...styles.buttonInput,borderColor:'black', paddingLeft:20,paddingRight:20, backgroundColor:'rgb(204,255,102)',marginTop:30}}><Text style={styles.boldText}>Premium for more!</Text></View>
          <Text style={{...styles.boldText,marginTop:30,color:'grey'}} onPress={()=>{router.navigate('/')}}>Sign out</Text>
        </View>
        <Text style={{color:'rgb(116,116,116)',textAlign:'center',textDecorationLine:'underline', marginBottom:20}}>Have a review?</Text>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
          <TextInput style={{...styles.buttonInput, flex:1,marginRight:10,paddingLeft:20,paddingRight:20}} placeholder="Recipe name"></TextInput>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/add_btn.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,paddingTop:0}}>
          <ScrollView style={styles.recipeInfoTable} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            {[...Array(10)].map((e, index) => 
              <View key = {index} style={{...styles.row,borderTopWidth:index===0?0:2,borderColor:'grey',paddingTop:10,paddingBottom:10}}>
                <View style={styles.buttonInput}>
                  <Text style={{...styles.boldText}}>nthoanh73@gmail.com</Text>
                </View>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                  <Image style={{...styles.buttonIcon}} source={require('../assets/images/delete_btn.png')}/>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
