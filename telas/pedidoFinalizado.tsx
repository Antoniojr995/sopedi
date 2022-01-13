import axios from 'axios';
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PedidoFinalizado({route,navigation}:any) {
  /*const pedido = route.params.pedido;
  const tipo = route.params.tipo;
  const [nome, setNome] = React.useState([]);
  const hasUnsavedChanges = Boolean(false);
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e:any) => {
        if (!hasUnsavedChanges) {
          return;
        }
        e.preventDefault();
      }),
    [navigation, hasUnsavedChanges]
  );
  React.useEffect(() => {
    let url = '';
      if(tipo==0){
        url=`https://61d5da1d6cb45e001718e069.mockapi.io/Hamburges/${pedido}`;
      }else if(tipo==1){
        url=`https://61d5da1d6cb45e001718e069.mockapi.io/Pizzas/${pedido}`;
      }else if(tipo==2){
        url=`https://61d5da1d6cb45e001718e069.mockapi.io/Bebidas/${pedido}`;
      }else if(tipo==3){
        url=`https://61d5da1d6cb45e001718e069.mockapi.io/Especiais/${pedido}`;
      }
      axios.get(url)
        .then(function (response) {
          // handle success
          setNome(response.data);
        })
  } ,[])*/
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
         
          <TouchableOpacity onPress={()=>{navigation.navigate("menu")}}>
                <Text>+</Text>
          </TouchableOpacity>
          <Button
            onPress={()=>{
              navigation.navigate("Inicio")
            }}
            title="+"
            color="#0000FF"
          />
           <Button
            onPress={()=>{
              navigation.navigate("Inicio")
            }}
            title="Fazer Pedido"
            color="#0000FF"
          />
           <Button
            onPress={()=>{
              navigation.navigate("Inicio")
            }}
            title="Finalizar Pedido"
            color="#0000FF"
          />
        </ScrollView>
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
});