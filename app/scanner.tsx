import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraView } from 'expo-camera';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
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
    textAlign:'center',
    display:'flex',
    flexDirection:'row'
  },
  typeFilter:{
    flex:1,
    alignItems:'center'
  },
  boldText:{
    fontWeight:'bold',
    fontSize:16, 
    textAlign:'center',
    color:'white'
  }
})
let finalData=""
let timestampId=null
let scanned = false
export default function Index() {
  const groceryIndex = useLocalSearchParams().groceryIndex;
  const [enableCamera,setEnableCamera]=React.useState(false)
  const [progress,setProgress]=React.useState(0)
  const [total,setTotal]=React.useState(0)
  const [screenAlert,setScreenAlert]=React.useState('Let\'s start with the first QR code')
  const requestScanner=async ()=>{
    const { status } = await Camera.requestCameraPermissionsAsync();
    setEnableCamera(status === 'granted')
    if(status !== 'granted'){
        alert('Please enable camera permission in Settings')
    }
  }
  const alert=(warning)=>{
    setScreenAlert(warning)
    scanned=false
  }
  const handleBarCodeScanned = ({ type, data }) => {
    if(scanned)return
    scanned = true;
    try{
      const divider = data.indexOf('@');
      if (divider === -1) return alert('Invalid QR code')
      const header = data.substring(0, divider).split('-')
      const qrTimestampId=header[0]
      const qrTotal=parseInt(header[1])
      const qrIndex=parseInt(header[2])+1
      if(!(qrTimestampId && qrTotal && qrIndex)) return alert('Invalid QR code')
      if(timestampId && timestampId!==qrTimestampId) return alert("This QR code doesn't match previous codes")
      if(total===0 && qrIndex!==1) return alert('This is not the first QR code')
      if(qrIndex<progress+1) return alert(`Already scanned QR code #${qrIndex}. Please use #${progress+1}`)
      if(qrIndex>progress+1) return alert(`This is QR code #${qrIndex}. Please use #${progress+1} first`)
      if(!timestampId)timestampId=qrTimestampId
      if(total===0)setTotal(qrTotal)
      const payload = data.substring(divider + 1)
      finalData+=payload
      setProgress(progress+1)
      setScreenAlert('')
      if(qrIndex<qrTotal)Alert.alert(
        `Let's continue with\nQR code #${qrIndex+1}`,
        '',
        [
          {
            text: 'Continue', // Text for the button
            onPress: () => {
              scanned=false
            },
          },
        ],
        { cancelable: false } // Optional: prevents closing by tapping outside or back button
      );
    }catch(error){
      alert('Invalid QR code')
    }
  }
  const processGrocery=async ()=>{
    try{
      let groceries = await longTermStorage.retrieve('groceries')
      if(!groceries) return Alert.alert('Unable to validate QR codes. Please try again and make sure your QR codes are clear to scan!')
      groceries=JSON.parse(groceries)
      groceries[groceryIndex]=JSON.parse(finalData)
      groceries[groceryIndex].sort((a,b)=>a.name.localeCompare(b.name))
      longTermStorage.store('groceries',JSON.stringify(groceries))
      router.back()
    }catch(error){
      return Alert.alert('Unable to validate QR codes. Please try again and make sure your QR codes are clear to scan!')
    }
  }
  const processRecipe=()=>{
    try{
      let finalCheck=JSON.parse(finalData)
      router.replace({pathname:'/recipe',params:{recipe:finalData,add:true}})
    }catch(error){
      return Alert.alert('Unable to validate QR codes. Please try again and make sure your QR codes are clear to scan!')
    }
  }
  useEffect(() => {
    finalData=""
    timestampId=null
    scanned = false
    requestScanner()
  },[useIsFocused()])
  return (
    //ignore system bar for iOS (SafeAreaView) & android (margin & padding)
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingBottom: StatusBar.currentHeight}}>
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        {!(total===0 || total!==progress) && <View style={{
          width: '75%',
          aspectRatio: 1, // this will make the view square
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          backgroundColor:'white',
          borderRadius:20,
          overflow:'hidden',
          alignItems: 'center'
        }}>
          <Image
            style={{
              width: '40%',
              height: undefined,
              aspectRatio: 1,
            }}
            source={require('../assets/images/checkmark.png')}
          />
          <Text style={{color:'grey',paddingTop:20,width: '75%',textAlign:'center'}}>Successfully scanned all codes</Text>
        </View>}
        {(total===0 || total!==progress) && <View style={{
          width: '75%',
          aspectRatio: 1, // this will make the view square
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          backgroundColor:'black',
          borderRadius:20,
          overflow:'hidden'
        }}>
          <CameraView
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={{
              height:'100%',
              alignItems:'center',
              justifyContent:'space-around'
            }}
          />
        </View>}
        <Text style={{color:'grey',paddingTop:20,width: '75%',textAlign:'center',height:100,marginBottom:30}}>{screenAlert}</Text>
        <View style={styles.buttonInput}>
          {!enableCamera && <TouchableOpacity 
            style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',width:'50%',paddingLeft:20,paddingRight:20}} 
            onPress={requestScanner}
          >
            <Text style={styles.boldText}>Enable Camera</Text>
          </TouchableOpacity>}
          {enableCamera && (total!==progress || total ===0) && <Progress.Bar progress={total?progress/total:0} color='rgb(58,58,58)'/>}
          {enableCamera && (total!==0 && total===progress) && <TouchableOpacity 
            style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',paddingLeft:30,paddingRight:30}}
            onPress={()=>{
              if(groceryIndex !== undefined && groceryIndex !== null)processGrocery()
              else processRecipe()
            }}
          >
            <Text style={styles.boldText}>Continue</Text>
          </TouchableOpacity>}
        </View>
      </View>
      <View style={{...styles.row,backgroundColor: 'white',paddingBottom:20}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={{...styles.boldText,color:'black'}}>Cancel</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
