import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SectionList } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
const axios = require('axios');

export default function Pedido({route,navigation}:any) {
  const tipo = route.params.tipo;
  const mesa = route.params.mesa;
  const [comanda,setComanda] = useState(route.params.comanda);
  const [comidas,setComidas] = useState([]);
  const [atualizar,setAtualizar] = useState(null);
  const [pedido,setPedido] = useState([]);
  useEffect(() => {
    let tipos = [];
    axios.get("https://61d5da1d6cb45e001718e069.mockapi.io/comida")
      .then(function (response:any) {
        response.data.map((item,index)=>{
          item.checked = false;
          item.setChecked = (valor:boolean)=>{
            item.checked=valor;
          }
          console.log(item);
          if(item.tipo==tipo){
            tipos.push(item);
          }
        })
        setComidas(tipos);
      })
  } ,[]);
  function renderItem(item){
    return(
      <View>
          <Checkbox
            value={item.item.checked}
            onValueChange={(val)=>{
              item.item.setChecked(!item.item.checked);
              if(item.item.checked){
                setAtualizar(item.item);
                let pedido_temp = pedido;
                let inserir = {comida:item.item.id,qtd:1};
                pedido_temp.push(...[inserir]);
                setPedido(pedido_temp);
              }else{
                setAtualizar(null);
                let pedido_temp = pedido;
                item.item.setChecked(!item.item.checked);
                let busca = {comida:item.item.id,qtd:1};
                let remover = pedido_temp.indexOf(busca);
                if (remover > -1) {
                  pedido_temp.splice(remover, 1);
                }
                item.item.setChecked(!item.item.checked);
                setPedido(pedido_temp);
              }
            }}
          />
          <Text>{item.item.nome}</Text>
          <Text>R$ {item.item.preco.toString()}</Text>
      </View>
    );
  }
  function enviarComanda(){
    let comanda_temp = comanda;
    let pedido_temp = pedido;
    comanda.map((item,index)=>{
      pedido.map((item2)=>{
        if(item.comida==item2.comida){
          comanda_temp[index].qtd+=1;
          let remover = pedido_temp.indexOf(item2);
          if (remover > -1) {
            pedido_temp.splice(remover, 1);
          }
        }
      })
    })
    comanda_temp.push(...pedido_temp);
    setComanda(comanda_temp);
    navigation.navigate('comanda',{mesa:mesa,comanda:comanda})
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comidas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={atualizar}
      />
      <TouchableOpacity onPress={()=>{enviarComanda()}}>
        <Text>Adicionar na comanda</Text>
      </TouchableOpacity>
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