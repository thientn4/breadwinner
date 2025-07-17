import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  }
})
export default function TabLayout() {
  return (
    <View style={{flex:1}}>
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: 'black', 
      }}>
        <Tabs.Screen
          name="menu"
          options={{
              headerShown: false,
              title: 'Menu',
              tabBarIcon: ({ color }) => <Ionicons size={28} name="pizza-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="plan"
          options={{
              headerShown: false,
              title: 'Plan',
              tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="grocery"
          options={{
              headerShown: false,
              title: 'Grocery',
              tabBarIcon: ({ color }) => <Ionicons size={28} name="cart-outline" color={color} />,
          }}
        />
      </Tabs>
      <SafeAreaView style={{...styles.row,backgroundColor:'rgb(58,58,58)',padding:10,paddingBottom:StatusBar.currentHeight}}>
        <TouchableOpacity style={{...styles.buttonInput,borderColor:'white',paddingLeft:10,paddingRight:10,flex:1,marginRight:10}}>
            <Text style={styles.boldText}>ntmthien01@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1}}>
            <Image style={styles.buttonIcon} source={require('../../assets/images/reload_btn.png')}/>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
