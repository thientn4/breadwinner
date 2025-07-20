import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as localStorage from '../function/localStorage';

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
let recipes=null
const dishTypes=['Appetizer', 'Main', 'Dessert', 'Other']
export default function Index() {
  const instructionRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  const params=useLocalSearchParams();
  const recipe = params?.recipe?JSON.parse(params.recipe):null;
  const [dishType,setDishType]=useState(recipe?recipe.type:0)
  const [recipeName,setRecipeName]=useState(recipe?recipe.name:'')
  const [ingredients,setIngredients]=useState(recipe?recipe.ingredients.sort((a,b)=>a.name.localeCompare(b.name)):[])
  const [ingredient,setIngredient]=useState('')
  const [quantity,setQuantity]=useState('')
  const [instruction,setInstruction]=useState(recipe?recipe.instruction:'')
  const [instructionActive,setInstructionActive]=useState(false)
  useEffect(()=>{
    const getRecipes = async()=>{
      let data = await localStorage.retrieve('recipes')
      if(data)recipes=JSON.parse(data)
    }
    getRecipes()
  })
  const addRecipe=async ()=>{
    if(recipes===null){
      let data = await localStorage.retrieve('recipes')
      if(data)recipes=JSON.parse(data)
    }
    if(recipes!==null){
      if(recipeName.trim()==='' || instruction.trim()==='' || ingredients.length===0)
        return alert('a recipe must have its name, ingredients, instruction')
      for(let i=0; i<recipes.length; i++)
        if(recipes[i].name===recipeName)
          return alert(`You already have a recipe for '${recipeName}'`)
      recipes.push({
        "name": recipeName.trim(),
        "type": dishType,
        "ingredients": ingredients,
        "instruction": instruction.trim()
      })
      recipes.sort((a,b)=>a.name.localeCompare(b.name))
      localStorage.store('recipes',JSON.stringify(recipes))
      alert('New recipe added!')
      router.back()
    }else{
      alert('There was an error. Please try again later.')
    }
  }
  const deleteRecipe=async ()=>{
    if(recipes===null){
      let data = await localStorage.retrieve('recipes')
      if(data)recipes=JSON.parse(data)
    }
    if(recipes!==null){
      recipes=recipes.filter((item)=>item.name!==recipe.name)
      localStorage.store('recipes',JSON.stringify(recipes))
      alert('Recipe removed!')
      router.back()
    }else{
      alert('There was an error. Please try again later.')
    }
  }
  const updateRecipe=async ()=>{
    if(recipes===null){
      let data = await localStorage.retrieve('recipes')
      if(data)recipes=JSON.parse(data)
    }
    if(recipes!==null){
      if(recipeName.trim()==='' || instruction.trim()==='' || ingredients.length===0)
        return alert('a recipe must have its name, ingredients, instruction')
      if(recipeName!==recipe.name)
        for(let i=0; i<recipes.length; i++)
          if(recipes[i].name===recipeName)
            return alert(`You already have a recipe for '${recipeName}'`)
      recipes=recipes.filter((item)=>item.name!==recipe.name)
      recipes.push({
        "name": recipeName,
        "type": dishType,
        "ingredients": ingredients,
        "instruction": instruction
      })
      recipes.sort((a,b)=>a.name.localeCompare(b.name))
      localStorage.store('recipes',JSON.stringify(recipes))
      alert('Recipe updated!')
      router.back()
    }else{
      alert('There was an error. Please try again later.')
    }
  }
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight}}>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS==="ios"?'padding':undefined}
      >
        <ScrollView 
          style={styles.column}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!instructionActive}
          keyboardShouldPersistTaps={instructionActive?'always':'never'}
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
                placeholder="Ingredient (short & simple)" 
                placeholderTextColor="grey"
                value={ingredient}
                onChangeText={(text) => {setIngredient(text)}}
              />
              <View style={{...styles.row,flex:1, paddingLeft:10, paddingRight:10}}>
                <TextInput 
                  style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10}} 
                  placeholder="Quantity & note" 
                  placeholderTextColor="grey"
                  value={quantity}
                  onChangeText={(text) => {setQuantity(text)}}
                />
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{
                  if(ingredient.trim()==='')return
                  if(ingredient!==ingredient.replace(/[^a-zA-Z]/g, ''))return alert("Keep ingredient name simple (alphabetical only)\n\n👍 'Garlic'\n\n👎 'Minced garlic (3 gloves)'")
                  let newIngredients=[
                    {name:ingredient.toLowerCase(),quantity:quantity.toLowerCase()},
                    ...ingredients.filter((item)=>item.name!==ingredient)
                  ].sort((a,b)=>a.name.localeCompare(b.name))
                  setIngredients(newIngredients)
                }}>
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
                {ingredients.map((item, index) => 
                  <View key = {index} style={{...styles.row,borderTopWidth:index===0?0:2,borderColor:'grey',paddingTop:10,paddingBottom:10}}>
                    <View>
                      <Text style={{...styles.boldText}}>{item.name}</Text>
                      <Text style={{...styles.boldText,color:'grey'}}>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{
                      setIngredients(ingredients.filter((itemFilter)=>item.name!==itemFilter.name))
                    }}>
                      <Image style={{...styles.buttonIcon}} source={require('../assets/images/delete_btn.png')}/>
                    </TouchableOpacity>
                  </View>
                )}
                {ingredients.length===0 && <View style={{...styles.column,justifyContent:'center',alignItems:'center'}}>
                  <Text>Let's add your first ingredients!</Text>
                </View>}
              </View>
            </View>
            {instruction.trim() && <Text style={{...styles.boldText,color:'grey',textDecorationLine:'underline',marginTop:10,marginBottom:0,marginRight:25,textAlign:'right'}}><Text 
              onPress={()=>{
                setInstructionActive(true)
                if (instructionRef.current) instructionRef.current.focus();
              }}
            >Edit instruction</Text></Text>}
          </View>}
          <View style={{flex:1,height:screenHeight/2+40,margin:10}}>
            {/* to open keyboard automatically for instruction input */}
            <TextInput multiline = {true} ref={instructionRef} style={{height:0,width:0}}/>
            <TextInput 
              style={{...styles.buttonInput,flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',textAlignVertical: 'top'}} 
              placeholder="Instruction" 
              placeholderTextColor="grey"
              multiline = {true}
              numberOfLines = {4}
              value={instruction}
              onChangeText={(text) => {setInstruction(text)}}
              onPress={()=>{if(!instruction.trim())setInstructionActive(true)}}
              editable={!instruction.trim() || instructionActive}
            />
          </View>
        </ScrollView>
        {instructionActive && <View style={{...styles.row,backgroundColor: 'white',paddingTop:10,borderTopWidth:2,paddingBottom:10}}>
          <TouchableOpacity style={styles.typeFilter} onPress={()=>{
            setInstructionActive(false)
            Keyboard.dismiss()
          }}><Text style={styles.boldText}>Done</Text></TouchableOpacity>
        </View>}
      </KeyboardAvoidingView>
      {!instructionActive && <View style={{...styles.row,backgroundColor: 'white',paddingTop:10,borderTopWidth:2}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{
          if(Keyboard.isVisible()){
            setInstructionActive(false)
            Keyboard.dismiss()
          }
          else router.back()
        }}><Text style={styles.boldText}>Cancel</Text></TouchableOpacity>
        <View style={{borderColor:'black',borderRightWidth:2}}></View>
        {recipe && <TouchableOpacity style={styles.typeFilter} onPress={()=>{deleteRecipe()}}><Text style={styles.boldText}>Delete</Text></TouchableOpacity>}
        {recipe && <View style={{borderColor:'black',borderRightWidth:2}}></View>}
        <TouchableOpacity style={{...styles.typeFilter,borderRightWidth:0}} onPress={()=>{
          if(!recipe)addRecipe()
          else updateRecipe()
        }}><Text style={styles.boldText}>{recipe?'Update':'Add'}</Text></TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
}
