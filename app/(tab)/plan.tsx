import { useRouter } from "expo-router";
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  boldText:{
    fontWeight:'bold',
    fontSize:16
  },
  cell:{
    borderColor:'rgb(232,232,232)',
    borderWidth:1,
    width:100,
    alignItems:'center'
  },
  cellItem:{
    backgroundColor:'white',
    borderRadius:10,
    padding:3,
    margin:2,
    borderColor:'black',
    borderWidth:2,
    textAlign:'left'
  }
})
export default function Index() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  return (
    <View style={{...styles.column,borderTopWidth:2}}>
      <ScrollView 
        style={{flex:1}} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      > 
        <ScrollView 
          style={styles.column}
          showsVerticalScrollIndicator={false}
        >
          {['','MON','TUE','WED','THU','FRI','SAT','SUN'].map((weekday, index) => 
            <View key = {index} style={index===0?styles.row:{...styles.row,minHeight:screenHeight/8-10}}>
              <View style={styles.cell}><Text style={{...styles.boldText,color:'grey',padding:10}}>{weekday}</Text></View>
              {['Breakfast','Lunch','Dinner'].map((mealType, subIndex) => 
                <View key={subIndex} style={{...styles.cell,width:screenWidth/2-40}}>
                  {index===0 && <Text style={{...styles.boldText,color:'grey',padding:10}}>{mealType}</Text>}
                  {index!==0 && ['',''].map((weekday, planIndex) => 
                    <TouchableOpacity key={planIndex} style={{...styles.cellItem,width:screenWidth/2-46}} onPress={()=>{router.navigate('/recipe')}}>
                      <Text><Text style={{...styles.boldText,color:'grey'}}>4x</Text> Vindaloo</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.cell}><Text style={{...styles.boldText,color:'grey',padding:10}}>{weekday}</Text></View>
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
