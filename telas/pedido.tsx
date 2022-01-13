import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const axios = require('axios');


export default function Pedido({route,navigation}:any) {
  const tipo = route.params.tipo;
  const usuario = route.params.usuario;
  const comanda = route.params.comanda;
  const [comidas, setComidas] = useState([]);
  useEffect(() => {
    let tipos = [];
    axios.get("https://61d5da1d6cb45e001718e069.mockapi.io/comida")
      .then(function (response:any) {
        response.data.map((item,index)=>{
          if(item.tipo==tipo){
            tipos.push(item);
          }
        })
        setComidas(tipos);
      })
  } ,[])
  const Item = ({ nome,id,valor }:any) =>(
    <View>
      <TouchableOpacity onPress={()=>{navigation.navigate('comanda',{pedido:id,usuario:usuario,comanda:comanda})}}>
        <Text>{nome}</Text>
        <Text>R$ {valor}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }:any) => <Item nome={item.nome} id={item.id} valor={item.preco}/>;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={comidas} renderItem={renderItem} keyExtractor={item => item.id}/>
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