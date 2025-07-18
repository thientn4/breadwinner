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
    textAlign:'center',
    display:'flex',
    flexDirection:'row'
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
  },
  recipeInfoTable:{
    //maxHeight:200,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight}}>
      <ScrollView 
        style={styles.column}
        showsVerticalScrollIndicator={false}
      >
        <Image style={{
          width:'100%',
          height:undefined,
          aspectRatio:4/3
        }} source={{uri:'https://static01.nyt.com/images/2024/10/10/multimedia/KC-Pork-Chile-Verderex-kzbh/KC-Pork-Chile-Verderex-kzbh-mediumSquareAt3X.jpg'}}/>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
          <TextInput style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}} placeholder="Recipe name"  placeholderTextColor="grey"></TextInput>
        </View>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,paddingTop:0}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/camera_btn.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.buttonInput, flex:1,marginLeft:10,marginRight:10}}>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
              <Text style={styles.boldText}>◀</Text>
            </TouchableOpacity>
            <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>Appetizer</Text>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
              <Text style={styles.boldText}>▶</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{alert('We are still working on this premium feature. Check back later for more!')}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/scan_btn.png')}/>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,margin:10}} placeholder="Ingredient" placeholderTextColor="grey"></TextInput>
          <View style={{...styles.row,flex:1, paddingLeft:10, paddingRight:10}}>
            <TextInput style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10}} placeholder="Quantity" placeholderTextColor="grey">
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
            placeholderTextColor="grey"
            multiline = {true}
            numberOfLines = {4}
          ></TextInput>
        </View>
      </ScrollView>
      <View style={{...styles.row,backgroundColor: 'white',paddingTop:10,borderTopWidth:2}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={styles.boldText}>Cancel</Text></TouchableOpacity>
        <View style={{borderColor:'black',borderRightWidth:2}}></View>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{}}><Text style={styles.boldText}>Delete</Text></TouchableOpacity>
        <View style={{borderColor:'black',borderRightWidth:2}}></View>
        <TouchableOpacity style={{...styles.typeFilter,borderRightWidth:0}} onPress={()=>{}}><Text style={styles.boldText}>Add</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
