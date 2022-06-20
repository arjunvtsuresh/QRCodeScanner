import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Linking, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-web';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    const supported = Linking.canOpenURL(`${data}`)

    if(supported){
      await Linking.openURL(`${data}`)
    }
    else{
      Alert.alert(`Couldnt open the given URL: ${data}`)
    }
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text1}>Scan</Text><Text style={styles.text2}>QR</Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
       
      <View style={styles.scanner}>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} style={styles.button} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  camera:{
    height:1000,
    width:600,
  },
  header:{
    flex:1,
    marginTop:50,
    marginLeft:20,
    marginRight:20,
    flexDirection:'row',
    alignSelf:'flex-start',
    borderBottomWidth: 2.5,
    borderColor: 'black',
    paddingLeft:20,
    paddingRight:60,
    paddingTop:40,
    shadowColor:'grey',
    shadowOpacity:0.5   
  },
  text1:{
    fontSize:25,
    fontWeight:'900',
    color:'lightblue',
  },
  text2:{
    fontSize:25,
    fontWeight:'900',
    color:'black',
  },
  scanner:{
    flex:1,
    flexDirection:'column',
    alignSelf:'flex-end',  
  },
  button:{
    borderRadius:200,
  }

});
