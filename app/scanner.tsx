import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraView } from 'expo-camera';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
export default function Index() {
  let finalData=""
  let timestampId=null
  const params=useLocalSearchParams();
  let scanned = false
  const [enableCamera,setEnableCamera]=React.useState(false)
  const [progress,setProgress]=React.useState(0)
  const [total,setTotal]=React.useState(0)
  const requestScanner=async ()=>{
    const { status } = await Camera.requestCameraPermissionsAsync();
    setEnableCamera(status === 'granted')
    if(status !== 'granted'){
        alert('Please enable camera permission in Settings')
    }
  }
  const alert=(warning)=>{
    Alert.alert(
      warning, // Title
      '',
      [
        {
          text: 'OK', // Text for the button
          onPress: () => {
            scanned=false
          },
        },
      ],
      { cancelable: false } // Optional: prevents closing by tapping outside or back button
    );
  }
  const handleBarCodeScanned = ({ type, data }) => {
    if(scanned)return
    scanned = true;
    scanned = true;
    try{
      const divider = data.indexOf('@');
      if (divider === -1) return alert('Invalid QR code')
      const header = data.substring(0, divider).split('-')
      const qrTimestampId=header[0]
      const qrTotal=parseInt(header[1])
      const qrIndex=parseInt(header[2])+1
      if(!(qrTimestampId && qrTotal && qrIndex)) return alert('Invalid QR code')
      if(!timestampId)timestampId=qrTimestampId
      if(timestampId!==qrTimestampId) return alert('Invalid QR code')
      if(total===0 && qrIndex!==0) return alert('Please scan in order')
      if(total===0)setTotal(parseInt(qrTotal))
      if(qrIndex!==progress+1) return alert('Please scan in order')
      setProgress(qrIndex+1)
      const payload = data.substring(divider + 1)
      finalData+=payload
      setProgress(progress+1)
      alert('Scan success')
    }catch(error){
      alert('Invalid QR code')
    }
  }
  useEffect(() => {
    finalData=""
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
        <View style={{
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
        </View>
        <View style={styles.buttonInput}>
          {!enableCamera && <TouchableOpacity 
            style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',width:'50%',marginTop:50}} 
            onPress={requestScanner}
          >
            <Text style={styles.boldText}>Enable Camera</Text>
          </TouchableOpacity>}
          {enableCamera && total!==0 && <View style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',width:'50%',marginTop:50}}>
            <Text style={{...styles.boldText,flex:1,marginRight:10}}>{progress}</Text>
            <Text style={styles.boldText}>/</Text>
            <Text style={{...styles.boldText,flex:1,marginLeft:10}}>{total}</Text>
          </View>}
          {enableCamera && total!==0 && total===progress && <TouchableOpacity 
            style={{...styles.buttonInput, backgroundColor:'rgb(58,58,58)',width:'50%',marginTop:50}}
            onPress={()=>{console.log(finalData)}}
          >
            <Text style={styles.boldText}>Done</Text>
          </TouchableOpacity>}
        </View>
      </View>
      <View style={{...styles.row,backgroundColor: 'white',paddingTop:10,borderTopWidth:2}}>
        <TouchableOpacity style={styles.typeFilter} onPress={()=>{router.back()}}><Text style={{...styles.boldText,color:'black'}}>Cancel</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
