import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    borderWidth:2,
    justifyContent:'space-between',
    borderRadius:20,
    height:40,
    overflow:'hidden',
    backgroundColor:'white',
    margin:10,
    marginTop:0
  },
  buttonInput:{
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
    overflow:'hidden',
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
      <SafeAreaView style={styles.row}>
        <TouchableOpacity style={{...styles.buttonInput,paddingLeft:10,paddingRight:10,flex:1}}>
            <Text style={styles.boldText}>ntmthien01@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonInput}}>
            <Image style={styles.buttonIcon} source={require('../../assets/images/reload_btn.png')}/>
        </TouchableOpacity>
      </SafeAreaView>
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: 'black', 
        tabBarLabelStyle:{
          margin:3
        },
        tabBarStyle:{
          borderColor:'black',
          borderTopWidth:2
        },
        tabBarItemStyle: {
          //backgroundColor:'yellow'
        }
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
    </View>
  );
}
