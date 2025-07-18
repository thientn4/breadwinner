import { useRouter } from "expo-router";
import React, { useRef } from 'react';
import { Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

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
  },
  typeFilter:{
    flex:1,
    alignItems:'center'
  },
})
export default function Index() {
  const flatListRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  return (
    <View style={styles.column}>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <TextInput style={{...styles.buttonInput, flex:1,marginRight:10,paddingLeft:20,paddingRight:20}} placeholder="Add to grocery" placeholderTextColor="grey"/>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={Keyboard.dismiss}>
          <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{flex:1}}>
        <KeyboardAvoidingView 
          style={{flex:1}}
          behavior={Platform.OS==="ios"?'padding':undefined}
          keyboardVerticalOffset={screenHeight/7}
        >
          <FlatList 
            ref={flatListRef}
            style={styles.column}
            showsVerticalScrollIndicator={false}
            data={[
              { id: '1', title: 'First Item' },
              { id: '2', title: 'Second Item' },
              { id: '3', title: 'Third Item' },
              { id: '4', title: 'Third Item' },
              { id: '5', title: 'Third Item' },
              { id: '6', title: 'Third Item' },
              { id: '7', title: 'Third Item' },
              { id: '8', title: 'Third Item' },
              // ... more items
            ]}
            renderItem={({ item, index }) => (
              <View  key = {index} style={{...styles.column, padding:10, paddingBottom:index===0?0:(index===7?60:10)}}>
                <TouchableWithoutFeedback   style={{flex:1}} onPress={Keyboard.dismiss}>
                  <View style={{...styles.row,flex:1, paddingBottom:10}}>
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                      <View style={{...styles.buttonInput,aspectRatio:1,backgroundColor:'black', height:20,borderColor:'none'}}/>
                    </TouchableOpacity>
                    <View style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10,marginLeft:10}}>
                      <Text style={styles.boldText}>curry powder</Text>
                    </View>
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                      <Image style={{...styles.buttonIcon}} source={require('../../assets/images/delete_btn.png')}/>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback  >
                {[...Array(3)].map((e, subIndex) => <Text key = {subIndex}  style={{...styles.boldText,color:'grey',paddingLeft:12}}>8x Butter Chicken</Text>)}
                <TextInput 
                  style={{...styles.buttonInput, flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',height:100, marginTop:10,textAlignVertical: 'top'}} 
                  placeholder="Note"
                  placeholderTextColor="grey"
                  multiline = {true}
                  numberOfLines = {4}
                  onPress ={()=>{flatListRef?.current?.scrollToIndex({ index: index, animated: true })}}
                />
              </View>
            )}
          />
        </KeyboardAvoidingView>
        <View style={{...styles.row,width:'100%', position:'absolute',bottom:0,alignSelf: 'flex-start',justifyContent:'center'}}>
          <TouchableOpacity style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',paddingLeft:20,paddingRight:20, margin:10, marginTop:0,borderWidth:0,alignSelf: 'flex-start'}}>
            <Text style={{...styles.boldText,color:'white'}}>update +</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <View style={{...styles.buttonInput, flex:1}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>All</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
