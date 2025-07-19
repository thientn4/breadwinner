import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    borderColor:'white',
    overflow:'hidden'
  }
})
const dishTypes=['Appetizer', 'Main', 'Dessert', 'Other']
export default function Index() {
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  const params=useLocalSearchParams();
  const recipe = params?.recipe?JSON.parse(params.recipe):null;
  const [dishType,setDishType]=useState(recipe?recipe.type:0)
  const [recipeName,setRecipeName]=useState(recipe?recipe.name:'')
  const [ingredients,setIngredients]=useState(recipe?recipe.ingredients:[])
  const [ingredient,setIngredient]=useState('')
  const [quantity,setQuantity]=useState('')
  const [instruction,setInstruction]=useState(recipe?recipe.instruction:'')
  const [instructionActive,setInstructionActive]=useState(false)
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight}}>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS==="ios"?'padding':undefined}
        keyboardVerticalOffset={screenHeight/80}
      >
        <ScrollView 
          style={styles.column}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!instructionActive}
        >
          {!instructionActive && <View>
            <Image style={{
              width:'100%',
              height:undefined,
              aspectRatio:3/2
            }} source={{uri:'https://static01.nyt.com/images/2024/10/10/multimedia/KC-Pork-Chile-Verderex-kzbh/KC-Pork-Chile-Verderex-kzbh-mediumSquareAt3X.jpg'}}/>
            <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
              <TextInput 
                style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}} 
                placeholder="Recipe name"  
                placeholderTextColor="grey"
                value={recipeName}
                onChangeText={(text) => {setRecipeName(text)}}
              />
            </View>
            <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,paddingTop:0}}>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{}}>
                <Image style={{...styles.buttonIcon, height:'60%'}} source={require('../assets/images/camera_btn.png')}/>
              </TouchableOpacity>
              <View style={{...styles.buttonInput, flex:1,marginLeft:10,marginRight:10}}>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={()=>{setDishType(dishType===0?3:(dishType-1))}}>
                  <Text style={styles.boldText}>◀</Text>
                </TouchableOpacity>
                <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>{dishTypes[dishType]}</Text>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={()=>{setDishType(dishType===3?0:(dishType+1))}}>
                  <Text style={styles.boldText}>▶</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{alert('We are still working on\nQR code generator.\nCheck back later for more!')}}>
                <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../assets/images/qr_btn.png')}/>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput 
                style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,margin:10}} 
                placeholder="Ingredient" 
                placeholderTextColor="grey"
                value={ingredient}
                onChangeText={(text) => {setIngredient(text)}}
              />
              <View style={{...styles.row,flex:1, paddingLeft:10, paddingRight:10}}>
                <TextInput 
                  style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10}} 
                  placeholder="Quantity" 
                  placeholderTextColor="grey"
                  value={quantity}
                  onChangeText={(text) => {setQuantity(text)}}
                />
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                  <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../assets/images/add_btn.png')}/>
                </TouchableOpacity>
              </View>
              <View style={{
                ...styles.recipeInfoTable,
                borderColor:'black',
                margin:10,
                marginBottom:0,
                minHeight:150,
                opacity:ingredients.length===0?0.3:1
              }}>
                {ingredients.map((ingredient, index) => 
                  <View key = {index} style={{...styles.row,borderTopWidth:index===0?0:2,borderColor:'grey',paddingTop:10,paddingBottom:10}}>
                    <View>
                      <Text style={{...styles.boldText}}>{ingredient.name}</Text>
                      <Text style={{...styles.boldText,color:'grey'}}>{ingredient.quantity}</Text>
                    </View>
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                      <Image style={{...styles.buttonIcon}} source={require('../assets/images/delete_btn.png')}/>
                    </TouchableOpacity>
                  </View>
                )}
                {ingredients.length===0 && <View style={{...styles.column,justifyContent:'center',alignItems:'center'}}>
                  <Text>Let's add your first ingredients!</Text>
                </View>}
              </View>
            </View>
          </View>}
          <View style={{flex:1,height:screenHeight/2+40,margin:10}}>
            <TextInput 
              style={{...styles.buttonInput,flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',textAlignVertical: 'top'}} 
              placeholder="Instruction" 
              placeholderTextColor="grey"
              multiline = {true}
              numberOfLines = {4}
              value={instruction}
              onChangeText={(text) => {setInstruction(text)}}
              editable={true}
              onPress={()=>setInstructionActive(true)}
            />
          </View>
        </ScrollView>
        <View style={{...styles.row,backgroundColor: 'white',paddingTop:10,borderTopWidth:2}}>
          <TouchableOpacity style={styles.typeFilter} onPress={()=>{
            if(Keyboard.isVisible()){
              setInstructionActive(false)
              Keyboard.dismiss()
            }
            else router.back()
          }}><Text style={styles.boldText}>{instructionActive?'Done':'Cancel'}</Text></TouchableOpacity>
          {!instructionActive && <View style={{borderColor:'black',borderRightWidth:2}}></View>}
          {!instructionActive && <TouchableOpacity style={styles.typeFilter} onPress={()=>{}}><Text style={styles.boldText}>Delete</Text></TouchableOpacity>}
          {!instructionActive && <View style={{borderColor:'black',borderRightWidth:2}}></View>}
          {!instructionActive && <TouchableOpacity style={{...styles.typeFilter,borderRightWidth:0}} onPress={()=>{}}><Text style={styles.boldText}>Add</Text></TouchableOpacity>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
