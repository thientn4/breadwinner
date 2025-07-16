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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingBottom: StatusBar.currentHeight}}>
      <ScrollView 
        style={styles.column}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <Image style={{
          width:'100%',
          height:undefined,
          aspectRatio:3/2
        }} source={{uri:'https://static01.nyt.com/images/2024/10/10/multimedia/KC-Pork-Chile-Verderex-kzbh/KC-Pork-Chile-Verderex-kzbh-mediumSquareAt3X.jpg'}}/>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
          <TextInput style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}} placeholder="Recipe name"></TextInput>
        </View>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',paddingLeft:10,paddingRight:10}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/camera_btn.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.buttonInput, flex:1,marginLeft:10,marginRight:10,paddingLeft:20,paddingRight:20}}><Text style={styles.boldText}>Main</Text></TouchableOpacity>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/AI_btn.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
          <ScrollView style={styles.recipeInfoTable} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            {[...Array(10)].map((e, index) => 
              <View key = {index} style={{...styles.row,borderTopWidth:index===0?0:2,borderColor:'grey',paddingTop:10,paddingBottom:10}}>
                <View style={styles.buttonInput}>
                  <Text style={{...styles.boldText}}><Text style={{...styles.boldText,color:'grey'}}>4x</Text> Monday breakfast</Text>
                </View>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                  <Image style={{...styles.buttonIcon}} source={require('../assets/images/delete_btn.png')}/>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
        <View>
          <TextInput style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,margin:10}} placeholder="Ingredient"></TextInput>
          <View style={{...styles.row,flex:1, paddingLeft:10, paddingRight:10}}>
            <TextInput style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10}} placeholder="Quantity">
            </TextInput>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
              <Image style={{...styles.buttonIcon}} source={require('../assets/images/add_btn.png')}/>
            </TouchableOpacity>
          </View>
          <ScrollView style={{
            ...styles.recipeInfoTable,
            borderColor:'black',
            margin:10,
            marginBottom:0
          }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            {[...Array(10)].map((e, index) => 
              <View key = {index} style={{...styles.row,borderTopWidth:index===0?0:2,borderColor:'grey',paddingTop:10,paddingBottom:10}}>
                <View>
                  <Text style={{...styles.boldText}}>curry powder</Text>
                  <Text style={{...styles.boldText,color:'grey'}}>1 teaspoon</Text>
                </View>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                  <Image style={{...styles.buttonIcon}} source={require('../assets/images/delete_btn.png')}/>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
          <TextInput 
            style={{...styles.buttonInput, flex:1,margin:10,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',height:600, marginTop:10,textAlignVertical: 'top'}} 
            placeholder="Instruction"
            multiline = {true}
            numberOfLines = {4}
          ></TextInput>
        </View>
      </ScrollView>
      <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderTopWidth:2}}>
        <View style={styles.typeFilter}><Text style={styles.boldText} onPress={()=>{router.back()}}>Cancel</Text></View>
        <View style={styles.typeFilter}><Text style={styles.boldText} onPress={()=>{}}>Delete</Text></View>
        <View style={{...styles.typeFilter,borderRightWidth:0}}><Text style={styles.boldText} onPress={()=>{}} >Add</Text></View>
      </View>
    </SafeAreaView>
  );
}
