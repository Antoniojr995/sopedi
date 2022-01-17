import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export function escolher({}){
  alert('Necessita que a entregar seja realizada?')
}
export default function PedidoFeito({route,navigation}:any) {
  const [[hrs, mins, secs], setTime] = React.useState([0, route.params.tempo, 0]);
  const [isSelected, setSelection] = useState(false);
  const pedido = route.params.pedido;
  const mesa = route.params.mesa;
  const [nome, setNome] = React.useState([]);
  const [acabou, setAcabou] = React.useState(false);
  const hasUnsavedChanges = Boolean(false);
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0){ 
        alert("PEDIDO PRONTO")
        setAcabou(true);
    }else if (mins === 0 && secs === 0) {
        setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
        setTime([hrs, mins - 1, 59]);
    } else {
        setTime([hrs, mins, secs - 1]);
    }
  };
  React.useEffect(() => {
    if(!acabou){
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  }); 
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.vw}>
          {secs%3 == 0 && (
            <Text style={styles.text}>Em esperar  .</Text>
          )}
          {secs%3 == 1 && (
            <Text style={styles.text}>Em esperar  . .</Text>
          )}
          {secs%3 == 2 && (
            <Text style={styles.text}>Em esperar  . . .</Text>
          )}
          <Text style={styles.text}>Tempo estimado de</Text>
          <Text style={styles.tempo}>{`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</Text>
          <Text style={styles.text}>minutos para sair seu pedido.</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              navigation.navigate('Menu',{comanda:[],mesa:mesa});
            }}
          >
            <Text style={styles.btn_text}>Fazer outro Pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              navigation.navigate("Inicio")
            }}
          >
            <Text style={styles.btn_text}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vw: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  },
  tempo: {
    fontSize: 50
  },
  btn: {
    backgroundColor: '#0000ff',
    borderRadius: 10,
    margin: 10,
    padding: 5
  },
  btn_text: {
    color: 'white',
    fontSize: 20
  }
});