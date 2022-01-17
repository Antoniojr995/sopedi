import React from 'react';
import { StyleSheet, View, Text, TouchableOpacityBase, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
export default function HomeScreen({navigation}){
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    const [mesa, setMesa] = React.useState(0);
    React.useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let r = parseInt(data);
        if(r && r>0){
            navigation.navigate('Menu',{comanda:[],mesa:r});
        }
    };
    if (hasPermission === null) {
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
    if (hasPermission === false) {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    value={mesa}
                    onChangeText={setMesa}
                    keyboardType='numeric'
                />
                <Button title={'ENIVAR'} onPress={() => navigation.navigate('Menu',{comanda:[],mesa:mesa})} />
            </SafeAreaView>
            )
    }else{
        return (
        <SafeAreaView style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <View>
                    <Button title={'Tentar novamente'} onPress={() => setScanned(false)} />
                    <TextInput
                        style={{backgroundColor:'white'}}
                        value={mesa}
                        onChangeText={setMesa}
                        keyboardType='numeric'
                    />
                    <Button title={'ENIVAR'} onPress={() => navigation.navigate('Menu',{comanda:[],mesa:mesa})} />
                </View>
            )}
        </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1EAF4',
        paddingTop: "5%",
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
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