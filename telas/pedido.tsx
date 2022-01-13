import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BouncyCheckbox } from "react-native-bouncy-checkbox";
import { DrawerItem } from '@react-navigation/drawer';
const axios = require('axios');


export default function Pedido({route,navigation}:any) {
  const tipo = route.params.tipo;
  const mesa = route.params.mesa;
  const comanda = route.params.comanda;
  const [comidas, setComidas] = useState([]);
  useEffect(() => {
    let tipos = [];
    axios.get("https://61d5da1d6cb45e001718e069.mockapi.io/comida")
      .then(function (response:any) {
        response.data.map((item,index)=>{
          console.log(item);
          item.checked = false;
          console.log(item);
          if(item.tipo==tipo){
            tipos.push(item);
          }
        })
        setComidas(tipos);
      })
  } ,[])
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={comidas} renderItem={(item)=>(
        <View>
          {item.item.checked ? (
            <TouchableOpacity onPress={()=>{console.log("MUDANDO");item.item.checked=false}}>
              <Text>OK</Text>
            </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={()=>{console.log("MUDANDO");item.item.checked=true}}>
                <Text>ADICIONAR</Text>
              </TouchableOpacity>
            )}
        <TouchableOpacity onPress={()=>{navigation.navigate('comanda',{pedido:item.item.id,mesa:mesa,comanda:comanda})}}>
          <Text>{item.item.nome}</Text>
          <Text>R$ {item.item.preco.toString()}</Text>
        </TouchableOpacity>
      </View>
      )} keyExtractor={item => item.id}/>
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