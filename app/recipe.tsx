import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { Alert, Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as longTermStorage from '../support/longTermStorage';

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
    height:35,
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
  const params=useLocalSearchParams();
  const recipe = params?.recipe?JSON.parse(params.recipe):null;
  const [dishType,setDishType]=useState(recipe?recipe.type:0)
  const [recipeName,setRecipeName]=useState(recipe?recipe.name:'')
  const [ingredients,setIngredients]=useState(recipe?recipe.ingredients.sort((a,b)=>a.name.localeCompare(b.name)):[])
  const [ingredient,setIngredient]=useState('')
  const [quantity,setQuantity]=useState('')
  const [instruction,setInstruction]=useState(recipe?recipe.instruction:'')
  const [image,setImage]=useState(recipe?.image)
  const [instructionActive,setInstructionActive]=useState(false)
  const addRecipe=async ()=>{
    let recipes = await longTermStorage.retrieve('recipes')
    if(!recipes) return Alert.alert('There was an error. Please try again later.','')
    recipes=JSON.parse(recipes)
    let processedName=recipeName.trim().replace(/\s+/g, ' ')
    let processedInstruction=instruction.trim().replace(/\s+/g, ' ')
    if(processedName==='' || processedInstruction==='' || ingredients.length===0)
      return Alert.alert('A recipe must have its name, ingredients, instruction','')
    for(let i=0; i<recipes.length; i++)
      if(recipes[i].name.toLowerCase()===processedName.toLowerCase())
        return Alert.alert(`Please pick another name.\nYou already have a recipe for '${recipes[i].name}'`,'')
    recipes.push({
      "image": (await updateImage()),
      "name": processedName,
      "type": dishType,
      "ingredients": ingredients,
      "instruction": processedInstruction
    })
    recipes.sort((a,b)=>a.name.localeCompare(b.name))
    longTermStorage.store('recipes',JSON.stringify(recipes))
    Alert.alert('New recipe added!','')
    router.back()
  }
  const deleteRecipe=async ()=>{
    let recipes = await longTermStorage.retrieve('recipes')
    if(!recipes) return Alert.alert('There was an error. Please try again later.','')
    if (recipe?.image && recipe?.image?.startsWith('file://')) {
      try {
        await FileSystem.deleteAsync(recipe?.image, { idempotent: true });
      } catch (error) {
        return Alert.alert('There was an error. Please try again later.','')
      }
    }
    recipes=JSON.parse(recipes)
    longTermStorage.store('recipes',JSON.stringify(recipes.filter((item)=>item.name!==recipe.name)))
    let plan=await longTermStorage.retrieve('plan')
    if(plan){
      plan=JSON.parse(plan)
      for(let i=0; i<plan.length; i++){
        for(let j=0; j<plan[i].length; j++){
          plan[i][j]=plan[i][j].filter((item)=>item.name!==recipe.name)
        }
      }
      longTermStorage.store('plan',JSON.stringify(plan))
    }
    router.back()
  }
  const updateRecipe=async ()=>{
    let recipes = await longTermStorage.retrieve('recipes')
    if(!recipes)return Alert.alert('There was an error. Please try again later.','')
    recipes=JSON.parse(recipes)
    ///////////////////////////////////// VALIDATE INPUT TEXT UPDATE ///////////////////////////////////////
    let processedName=recipeName.trim().replace(/\s+/g, ' ')
    let processedInstruction=instruction.trim().replace(/(\s)\1+/g, '$1')
    if(processedName==='' || processedInstruction==='' || ingredients.length===0)
      return Alert.alert('a recipe must have its name, ingredients, instruction','')
    if(processedName.toLowerCase()!==recipe.name.toLowerCase())
      for(let i=0; i<recipes.length; i++)
        if(recipes[i].name.toLowerCase()===processedName.toLowerCase())
          return Alert.alert(`You already have a recipe for '${recipes[i].name}'`,'')
    ///////////////////////////////////////// UPDATE RECIPE ///////////////////////////////////////////////
    recipes=recipes.filter((item)=>item.name!==recipe.name)
    recipes.push({
      "image": (await updateImage()),
      "name": processedName,
      "type": dishType,
      "ingredients": ingredients,
      "instruction": processedInstruction
    })
    recipes.sort((a,b)=>a.name.localeCompare(b.name))
    longTermStorage.store('recipes',JSON.stringify(recipes))
    let plan=await longTermStorage.retrieve('plan')
    if(plan){
      plan=JSON.parse(plan)
      for(let i=0; i<plan.length; i++)
        for(let j=0; j<plan[i].length; j++)
          for(let k=0;k<plan[i][j].length;k++)
            if(plan[i][j][k].name===recipe.name)plan[i][j][k].name=processedName
      longTermStorage.store('plan',JSON.stringify(plan))
    }
    Alert.alert('Recipe updated!','')
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) setImage(result.assets[0].uri);
  }
  const updateImage = async()=>{
    if (image === recipe?.image) return recipe?.image
    // Step 1: Delete the old image if it existed and was stored in the FileSystem
    if (recipe?.image && recipe?.image?.startsWith('file://')) {
      try {
        await FileSystem.deleteAsync(recipe?.image, { idempotent: true });
      } catch (error) {
        return recipe?.image; // If deletion fails, return the old image path
      }
    }

    // Step 2: Save the new image if a new one was selected (and it's a temporary URI from ImagePicker)
    // Check if 'image' state has a URI, starts with 'file://', AND is NOT already in our documentDirectory
    // (This ensures we only copy newly selected temporary files, not already saved ones).
    if (image && image.startsWith('file://') && !image.includes(FileSystem.documentDirectory || '')) {
      const newPath = FileSystem.documentDirectory + image.split('/').pop();
      try {
        await FileSystem.copyAsync({
          from: image, // Temporary URI from ImagePicker
          to: newPath, // Permanent location
        });
        return newPath;
      } catch (error) {
        return null;
      }
    }
  }
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight, paddingTop: (instructionActive?StatusBar.currentHeight:0)}}>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS==="ios"?'padding':'height'}
      >
        <ScrollView 
          style={styles.column}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!instructionActive}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flexGrow:1}}
        >
          {!instructionActive && <View>
            <Image style={{
              width:'100%',
              height:undefined,
              aspectRatio:3/2
            }} source={image?{uri:image}:require('../assets/images/photo-placeholder.png')}/>
            <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
              <TextInput 
                maxLength={50}
                style={{...styles.buttonInput, flex:1,paddingLeft:20,paddingRight:20}} 
                placeholder="Recipe name"  
                placeholderTextColor="grey"
                value={recipeName}
                onChangeText={(text) => {setRecipeName(text)}}
              />
            </View>
            <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,paddingTop:0}}>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{pickImage()}}>
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
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{
                let scanRecipe={...recipe}
                delete scanRecipe.image
                router.push({pathname:'/qr',params:{codeData:JSON.stringify(scanRecipe)}})
              }}>
                <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../assets/images/qr_btn.png')}/>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput 
                maxLength={50}
                style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,margin:10}} 
                placeholder="Ingredient (short & simple)" 
                placeholderTextColor="grey"
                value={ingredient}
                onChangeText={(text) => {setIngredient(text)}}
              />
              <View style={{...styles.row,flex:1, paddingLeft:10, paddingRight:10}}>
                <TextInput 
                  maxLength={100}
                  style={{...styles.buttonInput,borderColor:'black',paddingLeft:10,paddingRight:10,flex:1,marginRight:10}} 
                  placeholder="Quantity & note" 
                  placeholderTextColor="grey"
                  value={quantity}
                  onChangeText={(text) => {setQuantity(text)}}
                />
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{
                  let processedIngredientName=ingredient.toLowerCase().trim().replace(/\s+/g, ' ')
                  if(processedIngredientName==='')return
                  if(ingredient!==ingredient.replace(/[^\p{L}\s]/gu, ''))return Alert.alert("Keep ingredient name simple (alphabetical only)\n\n👍 'Garlic'\n\n👎 'Minced garlic (3 gloves)'",'')
                  let newIngredients=[
                    {name:processedIngredientName,quantity:quantity.toLowerCase().trim().replace(/\s+/g, ' ')},
                    ...ingredients.filter((item)=>item.name!==processedIngredientName)
                  ].sort((a,b)=>a.name.localeCompare(b.name))
                  setIngredients(newIngredients)
                  setIngredient('')
                  setQuantity('')
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
                    <View style={{display:'flex',flexDirection:'column',flex:1,justifyContent:'center'}}>
                      <Text style={{...styles.boldText}}>{item.name}</Text>
                      {item.quantity && <Text style={{...styles.boldText,color:'grey'}}>{item.quantity}</Text>}
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
              onPress={()=>{setInstructionActive(true)}}
            >Edit instruction</Text></Text>}
          </View>}
          <View style={{flex:1,minHeight:screenHeight/3,margin:10}}>
            {(instructionActive || !instruction.trim()) && <TextInput 
              maxLength={8000}
              style={{...styles.buttonInput,flex:1,padding:15,textAlign:'left',backgroundColor:'rgb(232,232,232)',textAlignVertical: 'top'}} 
              placeholder="Instruction" 
              placeholderTextColor="grey"
              multiline = {true}
              numberOfLines = {4}
              value={instruction}
              onChangeText={(text) => {setInstruction(text)}}
              onPress={()=>{setInstructionActive(true)}}
            />}
            {!instructionActive && instruction.trim() && <Text 
              style={{flex:1,borderRadius:20, padding:15, backgroundColor:'rgb(232,232,232)'}}
            >{instruction.trim().replace(/(\s)\1+/g, '$1')}</Text>}
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
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={styles.boldText}>{'Back'}</Text></TouchableOpacity>
        <View style={{borderColor:'black',borderRightWidth:2}}></View>
        {recipe && <TouchableOpacity style={styles.typeFilter} onPress={()=>{
          Alert.alert(
            "Are you sure you want to delete this recipe?","",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: () => deleteRecipe(),
              },
            ],
            { cancelable: false } // Optional: prevents dismissing the alert by tapping outside (Android only)
          );
        }}><Text style={styles.boldText}>Delete</Text></TouchableOpacity>}
        {recipe && <View style={{borderColor:'black',borderRightWidth:2}}></View>}
        <TouchableOpacity style={{...styles.typeFilter,borderRightWidth:0}} onPress={()=>{
          if(!recipe)addRecipe()
          else updateRecipe()
        }}><Text style={styles.boldText}>{recipe?'Update':'Add'}</Text></TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
}
