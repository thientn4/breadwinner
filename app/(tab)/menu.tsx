import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as localStorage from '../../function/localStorage';

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
const weekdays=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const meals=['Breakfast','Lunch','Dinner']
const defaultRecipes=[
  {
    "name": "Chile Verde",
    "type": 1,
    "ingredients": [
      {
        "name": "Pork shoulder",
        "quantity": "3 lbs"
      },
      {
        "name": "Salt",
        "quantity": "1 1/2 tsp"
      },
      {
        "name": "Black pepper",
        "quantity": "1 tsp"
      },
      {
        "name": "Oil",
        "quantity": "2 tbsp"
      },
      {
        "name": "Tomatillos",
        "quantity": "2 lbs"
      },
      {
        "name": "Poblano peppers",
        "quantity": "2"
      },
      {
        "name": "Jalapeño peppers",
        "quantity": "1-2"
      },
      {
        "name": "Serrano peppers",
        "quantity": "1"
      },
      {
        "name": "White onion",
        "quantity": "1 large"
      },
      {
        "name": "Garlic cloves",
        "quantity": "4-6"
      },
      {
        "name": "Chicken broth",
        "quantity": "2-3 cups"
      },
      {
        "name": "Cilantro",
        "quantity": "1/2 cup"
      },
      {
        "name": "Ground cumin",
        "quantity": "1 tsp"
      },
      {
        "name": "Dried oregano",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Lime juice",
        "quantity": "1-2 tbsp"
      }
    ],
    "instruction": 
      `
      1. Season the pork cubes generously with salt and pepper.\n
      2. Heat vegetable oil in a large Dutch oven or heavy-bottomed pot over medium-high heat. Brown the pork in batches until golden on all sides. Remove pork and set aside.\n
      3. While the pork is browning, prepare the chile sauce. On a baking sheet, arrange the tomatillos, poblano, jalapeño, and serrano peppers. You can also char them directly over a gas flame or on a grill for extra smoky flavor.\n
      4. Broil or roast the vegetables for 10-15 minutes, turning occasionally, until softened and lightly charred. For a gas flame or grill, char until skins are blistered, then place in a bowl and cover with plastic wrap for 10 minutes to steam (this makes peeling easier).\n
      5. Once cooled slightly, peel the skin from the poblano, jalapeño, and serrano peppers if desired (optional for rustic sauce). Remove stems and seeds if you prefer less heat. Place all roasted vegetables (tomatillos, poblanos, jalapeños, serranos), chopped onion, and garlic cloves into a blender.\n
      6. Add 1 cup of chicken broth, cilantro, cumin, and oregano to the blender. Blend until smooth. Add more broth as needed to reach desired consistency, or if your blender struggles.\n
      7. Drain off any excess fat from the Dutch oven, leaving about 1-2 tablespoons. Add the blended chile sauce to the pot. Bring to a simmer, scraping up any browned bits from the bottom.\n
      8. Return the browned pork to the pot. Add enough remaining chicken broth to almost cover the pork. Bring to a gentle simmer, then reduce heat to low, cover, and cook for 2-3 hours, or until the pork is fork-tender.\n
      9. Stir occasionally to prevent sticking. If the sauce becomes too thick, add a little more chicken broth. If it's too thin, simmer uncovered for the last 30 minutes to reduce.\n
      10. Once the pork is tender, stir in the lime juice. Taste and adjust seasoning with salt and pepper if needed.\n
      11. Serve hot with warm tortillas, rice, or as a filling for burritos or tacos. Garnish with extra fresh cilantro or a dollop of sour cream/Crema Mexicana if desired.
      `
    
  },
  {
    "name": "Pork Vindaloo",
    "type": 1,
    "ingredients": [
      {
        "name": "Pork shoulder",
        "quantity": "3 lbs"
      },
      {
        "name": "White vinegar",
        "quantity": "1/2 cup"
      },
      {
        "name": "Garlic cloves",
        "quantity": "10-12"
      },
      {
        "name": "Fresh ginger",
        "quantity": "2-inch piece"
      },
      {
        "name": "Dried red chilies",
        "quantity": "8-12"
      },
      {
        "name": "Cumin seeds",
        "quantity": "1 tbsp"
      },
      {
        "name": "Coriander seeds",
        "quantity": "2 tbsp"
      },
      {
        "name": "Black peppercorns",
        "quantity": "1 tsp"
      },
      {
        "name": "Cloves",
        "quantity": "6-8"
      },
      {
        "name": "Green cardamom pods",
        "quantity": "4-6"
      },
      {
        "name": "Cinnamon stick",
        "quantity": "1-inch piece"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1 tsp"
      },
      {
        "name": "Turmeric powder",
        "quantity": "1 tsp"
      },
      {
        "name": "Salt",
        "quantity": "1 1/2 tsp"
      },
      {
        "name": "Sugar",
        "quantity": "1 tsp"
      },
      {
        "name": "Vegetable oil or Ghee",
        "quantity": "3 tbsp"
      },
      {
        "name": "Large onion",
        "quantity": "1"
      },
      {
        "name": "Water",
        "quantity": "1-2 cups"
      }
    ],
    "instruction": 
      `
        In a blender or food processor, combine the white vinegar, garlic cloves, fresh ginger, dried red chilies, cumin seeds, coriander seeds, black peppercorns, cloves, green cardamom pods, cinnamon stick, mustard seeds, and turmeric powder. \n
        Blend into a smooth paste, adding a tablespoon or two of water if needed to help it blend. \n
        In a large bowl, combine the pork cubes with the prepared vindaloo paste. Mix well to ensure all the pork is coated. \n
        Cover and refrigerate for at least 4 hours, or preferably overnight.\n
        Heat the vegetable oil or ghee in a large Dutch oven or heavy-bottomed pot over medium-high heat. \n
        Once hot, add the marinated pork in batches, making sure not to overcrowd the pot. \n
        Sear the pork on all sides until nicely browned. Remove the seared pork and set it aside.\n
        Reduce the heat to medium. \n
        Add the finely chopped onion to the pot and sauté until softened and translucent, about 5-7 minutes. \n
        If there's any remaining marinade paste in the bowl, scrape it into the pot and cook for another minute, stirring constantly.\n
        Return the seared pork to the pot. Stir well to combine with the onions and any remaining spices. Add 1 cup of water to the pot. \n
        Bring the mixture to a gentle simmer, scraping up any browned bits from the bottom of the pot. Stir in the salt and sugar (if using).\n
        Reduce the heat to low, cover the pot, and let it simmer for 1.5 to 2 hours, or until the pork is fall-apart tender. \n
        Stir occasionally to prevent sticking and add a little more water if the sauce becomes too thick. \n
        The goal is a rich, thick sauce, so if it's too watery at the end, remove the lid and simmer uncovered for the last 20-30 minutes to reduce.
      `
  },
  {
   "name": "Classic Cheesecake",
   "type": 2,
   "ingredients": [
     {
       "name": "Graham cracker",
       "quantity": "1 1/2 cups"
     },
     {
       "name": "Sugar",
       "quantity": "1/4 cup"
     },
     {
       "name": "Unsalted butter",
       "quantity": "6 tbsp"
     },
     {
       "name": "Cream cheese",
       "quantity": "32 oz (4 blocks)"
     },
     {
       "name": "Eggs",
       "quantity": "4"
     },
     {
       "name": "Sour cream",
       "quantity": "1 cup"
     },
     {
       "name": "Vanilla extract",
       "quantity": "1 tbsp"
     },
     {
       "name": "Lemon zest",
       "quantity": "1 tsp"
     }
   ],
   "instruction": 
    `
      1. Preheat oven to 325°F (160°C). Grease a 9-inch springform pan.\n
      2. In a medium bowl, combine graham cracker crumbs, 1/4 cup granulated sugar, and melted butter. Press the mixture firmly into the bottom of the prepared springform pan. Bake for 10 minutes. Remove from oven and let cool.\n
      3. In a large bowl, using an electric mixer, beat the softened cream cheese until smooth and creamy. Gradually add 1 1/2 cups granulated sugar, beating until well combined.\n
      4. Beat in the eggs one at a time, mixing well after each addition. Scrape down the sides of the bowl as needed.\n
      5. Stir in the sour cream, vanilla extract, and lemon zest (if using) until just combined. Do not overmix.\n
      6. Pour the cream cheese mixture over the cooled crust in the springform pan.\n
      7. Place the springform pan in a larger roasting pan. Pour hot water into the roasting pan to come halfway up the sides of the springform pan (this is a water bath, which helps prevent cracks).\n
      8. Bake for 60-75 minutes, or until the edges are set but the center still jiggles slightly when gently shaken. \n
      9. Turn off the oven, crack the oven door open, and leave the cheesecake in the oven for 1 hour to cool slowly. This also helps prevent cracks.\n
      10. Remove the cheesecake from the oven and water bath. Let it cool completely on a wire rack at room temperature.\n
      11. Once completely cool, cover loosely with plastic wrap and refrigerate for at least 4 hours, or preferably overnight, before serving. This allows the cheesecake to firm up and flavors to meld.\n
      12. Carefully remove the sides of the springform pan before slicing and serving. Top with your favorite fruit, sauces, or whipped cream if desired."
    `
  }
]
let recipes=[]
export default function Index() {
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  const [dishTypeFilter,setDishTypeFilter]=useState(-1)
  const [weekday,setWeekday]=useState(0)
  const [meal,setMeal]=useState(0)
  const [serving,setServing]=useState('1')
  const [filteredRecipes,setFilteredRecipes]=useState([])
  const [searchQuery,setSearchQuery]=useState('')
  const filter=(dishType)=>{
    setSearchQuery('')
    Keyboard.dismiss()
    setDishTypeFilter(dishType)
  }
  useEffect(()=>{
    localStorage.retrieve('recipes').then((data)=>{
      if(data){
        recipes=JSON.parse(data)
      }else{
        recipes=defaultRecipes
        localStorage.store(JSON.stringify(defaultRecipes))
      }
      setFilteredRecipes(recipes)
    })
  })
  return (
    <KeyboardAvoidingView 
      style={{...styles.column,backgroundColor:'rgb(58,58,58)'}}
      behavior={Platform.OS==="ios"?'padding':undefined}
      keyboardVerticalOffset={useBottomTabBarHeight()+20}
    >
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={()=>{Keyboard.dismiss;alert("We are still working on\nrecipe QR code scanner.\nCheck back later!")}}>
          <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../../assets/images/scan_btn.png')}/>
        </TouchableOpacity>
        <TextInput 
          style={{...styles.buttonInput, flex:1,marginRight:10,marginLeft:10,paddingLeft:20,paddingRight:20}} 
          placeholder="Search" 
          placeholderTextColor="grey"
          value={searchQuery}
          onChangeText={(text)=>{
            setDishTypeFilter(-1)
            setSearchQuery(text)
          }}
        />
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}  onPress={()=>{router.navigate('/recipe')}}>
          <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{...styles.row,paddingTop:10,paddingBottom:10,borderBottomWidth:2,backgroundColor:'white'}}>
        <TouchableOpacity  onPress={()=>filter(-1)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===-1?'black':'grey'}}>All</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(0)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===0?'black':'grey'}}>Apps</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(1)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===1?'black':'grey'}}>Main</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(2)} style={styles.typeFilter}><Text style={{...styles.boldText,color:dishTypeFilter===2?'black':'grey'}}>Dessert</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>filter(3)} style={{...styles.typeFilter,borderRightWidth:0}}><Text style={{...styles.boldText,color:dishTypeFilter===3?'black':'grey'}}>Other</Text></TouchableOpacity>
      </View>
      {filteredRecipes.length!==0 && <FlatList 
        style={styles.column}
        showsVerticalScrollIndicator={false}
        data={filteredRecipes}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            key = {index} 
            style={{
              ...styles.row,borderBottomWidth:2,borderColor:'grey',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10,
              display:(item.type===dishTypeFilter || (dishTypeFilter===-1 && item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())))?'flex':'none'
              //item.name.toLowerCase().includes(searchQuery)
            }}
            onPress={()=>{router.push({pathname:'/recipe',params:{recipe:JSON.stringify(item)}})}}
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
                <Text style={styles.boldText}>{item.name}</Text>
                <Text style={{...styles.boldText,color:'grey'}}>{JSON.stringify(item.ingredients.length)} ingredients</Text>
              </View>
              <View style={{...styles.column, justifyContent:'center',flex:0}}>
                <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}}>
                  <Image style={{...styles.buttonIcon, height:'45%'}} source={require('../../assets/images/add_btn.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />}
      {filteredRecipes.length===0 && <View style={{...styles.column,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'grey'}}  onPress={()=>{router.navigate('/recipe')}}>Let's <Text style={{textDecorationLine:'underline'}}>add</Text> a new recipe!</Text>
      </View>}
      <View style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10}}>
        <View style={{...styles.buttonInput,alignSelf: 'flex-start'}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setWeekday(weekday===0?6:(weekday-1))}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,width:35, textAlign:'center'}}>{weekdays[weekday]}</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setWeekday(weekday===6?0:(weekday+1))}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttonInput,flex:1, marginLeft:10, marginRight:10}}>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setMeal(meal===0?2:(meal-1))}}>
            <Text style={styles.boldText}>◀</Text>
          </TouchableOpacity>
          <Text style={{...styles.boldText,flex:1, textAlign:'center'}}>{meals[meal]}</Text>
          <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}} onPress={()=>{setMeal(meal===2?0:(meal+1))}}>
            <Text style={styles.boldText}>▶</Text>
          </TouchableOpacity>
        </View>
        <TextInput 
          style={{...styles.buttonInput,aspectRatio:1,textAlign:'center'}} 
          placeholder='#' 
          placeholderTextColor="grey"
          keyboardType="number-pad"
          maxLength={2}
          value={serving}
          onChangeText={(text) => {setServing(text.replace(/[^0-9]/g, ''))}}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
