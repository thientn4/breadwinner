import { useRouter } from 'expo-router';
import { Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
      }}
    >
      <Image style={{
        width:'40%',
        height:undefined,
        aspectRatio:1
      }} source={require('../assets/images/icon.png')}/>
      <Text style={{marginBottom:50,marginTop:75}} onPress={()=>{router.navigate('/menu')}}>Sign in with Google</Text>
      <Text style={{color:'rgb(116,116,116)',textAlign:'center'}}>First time user get{"\n"}1-month free trial</Text>
    </View>
  );
}
