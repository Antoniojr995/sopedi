import React from 'react';
import { StyleSheet, View, Text, TouchableOpacityBase, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function HomeScreen({navigation}){
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    React.useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let r = parseInt(data);
        navigation.navigate('Menu',{comanda:[],mesa:r});
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    return (
    <SafeAreaView style={styles.container}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tentar novamente'} onPress={() => setScanned(false)} />}
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1EAF4',
        paddingTop: "5%",
        alignItems: 'center',
    },
    container2: {
        flex: 1,
        backgroundColor: '#E1EAF4',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    btn:{
        backgroundColor: '#00C1F9',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6793AC",
        alignSelf: 'stretch',
        padding: 6,
        minWidth: "75%"
    },
    btn_text:{
        fontSize: 30,
        fontWeight: "bold",
        alignItems: 'center',
        textAlign: 'center',
        color: "#fff"
    }
});