import { router, Stack } from "expo-router";
import { Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

const styles=StyleSheet.create({
  row:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    paddingTop: StatusBar.currentHeight
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
    margin:10
  },
  buttonIcon:{
    height:'100%',
    width:undefined,
    aspectRatio:1
  }
})
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{
        gestureEnabled: false,
        header: () => (
          // ignore system bar for iOS (SafeAreaView) & android (margin & padding)
          <SafeAreaView style={styles.row}>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{alert("hello")}}>
              <Image style={{...styles.buttonIcon, height:'50%'}} source={require('../assets/images/question_btn.png')}/>
            </TouchableOpacity>
            <View style={{...styles.buttonInput,borderRadius:0}}>
              <Image style={{height:'100%',width:undefined, aspectRatio:1.2}} source={require('../assets/images/transparent_icon.png')}/>
            </View>
            <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{router.navigate('/subscription')}}>
              <Image style={{...styles.buttonIcon, height:'60%'}} source={require('../assets/images/setting_btn.png')}/>
            </TouchableOpacity>
          </SafeAreaView>
        ),
      }}>
        <Stack.Screen
          name="index"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="recipe"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="qr"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="scanner"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="subscription"
          options={{headerShown: false}}
        />
      </Stack>
    </>
  );
}
