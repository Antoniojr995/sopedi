import axios from 'axios';
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Comanda({route,navigation}:any) {
  const pedido = route.params.pedido;
  const mesa = route.params.mesa;
  const [comanda,setComanda] = React.useState(route.params.comanda);
  const [comidas,setComidas] = React.useState([]);
  const [loading,setLoading] = React.useState(false);
  const [total,setTotal] = React.useState(0.00);
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
    listComida();
  } ,[mesa,route.params.mesa])
  async function listComida(){
    let valor_total = 0.00;
    setLoading(false);
    console.log("CARREGANDO");
    let pedidos = comanda;
    pedidos.push(...[{id:pedido}]);
    let listagem = [];
    if(comanda){
      comanda.map(async (item)=>{
        await axios.get(`https://61d5da1d6cb45e001718e069.mockapi.io/comida/${item.id}`)
          .then(function (response) {
            listagem.push(...[response.data])
            valor_total+=response.data.preco;
            console.log(response.data);
            if(listagem.length==comanda.length){
              setComidas(listagem);
              setTotal(valor_total);
              console.log("PRONTO");
              setLoading(true);
            }
        });
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingTop:50}}>
          {comidas && loading ? (
            <FlatList data={comidas}
              renderItem={({ item,index }) => (
                <View key={index}>
                  <Text>PEDIDO - {item.nome}</Text>
                </View>
              )}
            />
          ):(
            <View><Text>CARREGANDO</Text></View>
          )}
          <Text>Total R$ {total.toString()}</Text>
          <Button
            onPress={()=>{
              navigation.navigate("Menu",{mesa:mesa,comanda:comanda})
            }}
            title="+"
            color="#0000FF"
          />
           <Button
            onPress={()=>{
              axios.post(`https://61d5da1d6cb45e001718e069.mockapi.io/pedido`,{mesa:mesa,pronto:false,comidas:comanda})
                .then(function (response) {
                console.log(response.data);
                navigation.navigate("PedidoFeito",{pedido:response.data,mesa:mesa})
              });
            }}
            title="Fazer Pedido"
            color="#0000FF"
          />
           <Button
            onPress={()=>{
              navigation.navigate("PedidoFinalizado")
            }}
            title="Finalizar Pedido"
            color="#0000FF"
          />
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
});