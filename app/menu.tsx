import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    borderRadius:40,
    height:40,
    overflow:'hidden',
    borderColor:'white',
    borderWidth:2
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
  }
})
export default function Index() {
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(58,58,58)', paddingBottom: StatusBar.currentHeight}}>
      <View style={styles.column}>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
          <TextInput style={{...styles.buttonInput, flex:1,marginRight:10,paddingLeft:20,paddingRight:20}}></TextInput>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/add_btn.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderBottomWidth:2}}>
          <View style={styles.typeFilter}><Text style={styles.boldText}>Apps</Text></View>
          <View style={styles.typeFilter}><Text style={styles.boldText}>Main</Text></View>
          <View style={styles.typeFilter}><Text style={styles.boldText}>Dessert</Text></View>
          <View style={{...styles.typeFilter,borderRightWidth:0}}><Text style={styles.boldText}>Other</Text></View>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={{...styles.row,borderBottomWidth:2,borderColor:'grey',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10}}>
            <Image style={{
              borderRadius:10,
              width:'25%',
              height:undefined,
              aspectRatio:1,
              marginRight:20
            }} source={{uri:'https://static01.nyt.com/images/2024/10/10/multimedia/KC-Pork-Chile-Verderex-kzbh/KC-Pork-Chile-Verderex-kzbh-mediumSquareAt3X.jpg'}}/>
            <View style={{...styles.column, justifyContent:'space-between'}}>
              <View style={{...styles.row,flex:1}}>
                <View>
                  <Text style={styles.boldText}>Chile Verde</Text>
                  <Text style={{...styles.boldText,color:'grey'}}>{4} ingredients</Text>
                </View>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                  <Image style={{...styles.buttonIcon}} source={require('../assets/images/add_btn.png')}/>
                </TouchableOpacity>
              </View>
              <View style={{...styles.row}}>
                <TouchableOpacity style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10}}>
                  <Text style={styles.boldText}>Mon</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10,marginLeft:10}}>
                  <Text style={styles.boldText}>Breakfast</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.buttonInput,borderColor:'black',aspectRatio:1}}>
                  <Text style={styles.boldText}>4</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderTopWidth:2}}>
          <View style={styles.typeFilter}><Text style={styles.boldText}>Menu</Text></View>
          <View style={styles.typeFilter}><Text style={styles.boldText}>Plan</Text></View>
          <View style={{...styles.typeFilter,borderRightWidth:0}}><Text style={styles.boldText}>Grocery</Text></View>
        </View>
        <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
          <TouchableOpacity style={{...styles.buttonInput,borderColor:'white',paddingLeft:10,paddingRight:10,flex:1,marginRight:10,marginLeft:10}}>
            <Text style={styles.boldText}>ntmthien01@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../assets/images/reload_btn.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
