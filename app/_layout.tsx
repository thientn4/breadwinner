import { Stack, useRouter } from "expo-router";
import { Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

const styles=StyleSheet.create({
  row:{
    display:'flex',
    flexDirection:'row',
    borderColor:'black',
    justifyContent:'space-between',
    backgroundColor:'white',
    padding:10
  },
  buttonInput:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
    borderRadius:40,
    height:40,
    overflow:'hidden',
    borderColor:'white',
    borderWidth:2
  },
  buttonIcon:{
    height:'100%',
    width:undefined,
    aspectRatio:1
  }
})
export default function RootLayout() {
  const router = useRouter();
  return (
    <>
      {/* ignore system bar for iOS (SafeAreaView) & android (margin & padding) */}
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white',marginTop: StatusBar.currentHeight}}/>
        <Stack screenOptions={{
          headerShown: true,
          header: () => (
            <View style={{...styles.row}}>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{router.navigate('/')}} >
                <Image style={styles.buttonIcon} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8Ndh_6Yi1w8G7Yg5iGtCQQVreP5sWLdUbg&s"}}/>
              </TouchableOpacity>
              <View style={{...styles.buttonInput,borderRadius:0}}>
                <Image style={{height:'100%',width:undefined, aspectRatio:1.2}} source={require('../assets/images/transparent_icon.png')}/>
              </View>
              <TouchableOpacity style={{...styles.buttonInput,aspectRatio:1,borderColor:'black'}} onPress={()=>{alert("hello")}}>
                <Image style={styles.buttonIcon} source={require('../assets/images/question_btn.png')}/>
              </TouchableOpacity>
            </View>
          ),
        }}>
          <Stack.Screen
            name="index"
            options={{headerShown: false}}
          />
        </Stack>
    </>
  );
}
