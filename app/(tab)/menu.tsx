import { useRouter } from "expo-router";
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
  }
})
export default function Index() {
  const router = useRouter();
  return (
    <KeyboardAvoidingView 
      style={{...styles.column,borderColor:'black', borderBottomWidth:2}}
      behavior={Platform.OS==="ios"?'padding':undefined}
      keyboardVerticalOffset={110}
    >
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
          <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/scan_btn.png')}/>
        </TouchableOpacity>
        <TextInput style={{...styles.buttonInput, flex:1,marginRight:10,marginLeft:10,paddingLeft:20,paddingRight:20}} placeholder="Search" placeholderTextColor="grey"></TextInput>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
          <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderBottomWidth:2}}>
        <View style={styles.typeFilter}><Text style={styles.boldText}>Apps</Text></View>
        <View style={styles.typeFilter}><Text style={styles.boldText}>Main</Text></View>
        <View style={styles.typeFilter}><Text style={styles.boldText}>Dessert</Text></View>
        <View style={{...styles.typeFilter,borderRightWidth:0}}><Text style={styles.boldText}>Other</Text></View>
      </View>
      <ScrollView 
        style={styles.column}
        showsVerticalScrollIndicator={false}
      >
        {[...Array(10)].map((e, index) => <TouchableOpacity 
          key = {index} 
          style={{...styles.row,borderTopWidth:index!==0?2:0,borderColor:'grey',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10}}
          onPress={()=>{router.navigate('/recipe')}}
        >
          <Image style={{
            borderRadius:10,
            width:'25%',
            height:undefined,
            aspectRatio:1,
            marginRight:20
          }} source={{uri:'https://static01.nyt.com/images/2024/10/10/multimedia/KC-Pork-Chile-Verderex-kzbh/KC-Pork-Chile-Verderex-kzbh-mediumSquareAt3X.jpg'}}/>
          <View style={{...styles.row,flex:1}}>
            <View style={{...styles.column, justifyContent:'center'}}>
              <Text style={styles.boldText}>Chile Verde</Text>
              <Text style={{...styles.boldText,color:'grey'}}>{4} ingredients</Text>
            </View>
            <View style={{...styles.column, justifyContent:'center',flex:0}}>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>)}
      </ScrollView>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <View style={{...styles.buttonInput,alignSelf: 'flex-start'}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,width:35, textAlign:'center'}}>Mon</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttonInput,flex:1, marginLeft:10, marginRight:10}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>Breakfast</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
        <TextInput 
          style={{...styles.buttonInput,aspectRatio:1,textAlign:'center'}} 
          placeholder='#' 
          placeholderTextColor="grey"
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
