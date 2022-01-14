import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Comanda({route,navigation}:any) {
  const mesa = route.params.mesa;
  const [comanda,setComanda] = React.useState(route.params.comanda);
  const [comidas,setComidas] = React.useState([]);
  const [loading,setLoading] = React.useState(false);
  const [total,setTotal] = React.useState(0.00);
  const [atualizar,setAtualizar] = React.useState(null);
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
  function del(index:number){
    let comanda_temp = comanda;
    let comidas_temp = comidas;
    let comida = comidas[index];
    let busca = {comida:comida.comida.id,qtd:comida.qtd};
    comanda.map((item,pos)=>{
      if(item.comida==busca.comida){
        comanda_temp[pos].qtd -= 1;
        setTotal(total-comidas[index].comida.preco);
      }
    });
    setAtualizar(busca);
    comidas_temp[index].qtd -= 1;
    console.log("DIMINUIR");
    setComanda(comanda_temp);
    setComidas(comidas_temp);
  }
  function add(index:number){
    let comanda_temp = comanda;
    let comidas_temp = comidas;
    let comida = comidas[index];
    let busca = {comida:comida.comida.id,qtd:comida.qtd};
    comanda.map((item,pos)=>{
      if(item.comida==busca.comida){
        comanda_temp[pos].qtd += 1;
        setTotal(total+comidas[index].comida.preco);
      }
    });
    setAtualizar(busca);
    comidas_temp[index].qtd += 1;
    console.log("AUMENTAR");
    setComanda(comanda_temp);
    setComidas(comidas_temp);
  }
  async function listComida(){
    let valor_total = 0.00;
    setLoading(false);
    console.log("CARREGANDO");
    let listagem = [];
    if(comanda){
      comanda.map(async (item)=>{
        await axios.get(`https://61d5da1d6cb45e001718e069.mockapi.io/comida/${item.comida}`)
          .then(function (response) {
            let comida_qtd = {comida:response.data,qtd:item.qtd}
            listagem.push(...[comida_qtd])
            valor_total+=(response.data.preco*item.qtd);
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
              keyExtractor={item=>item.comida.id}
              extraData={atualizar}
              ListHeaderComponent={(
                <View style={styles.lista}>
                  <Text style={styles.lista_text}>COMIDA</Text>
                  <Text style={styles.lista_text}>QUANTIDADE</Text>
                  <Text style={styles.lista_text}>PREÇO</Text>
                </View>
              )}
              renderItem={({ item,index }) => (
                <View style={styles.lista} key={index}>
                  <Text style={styles.lista_text}>{item.comida.nome}</Text>
                  <View style={styles.lista_view}>
                    <TouchableOpacity onPress={()=>{del(index)}} style={styles.lista_btn}>
                      <Ionicons name="remove-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.lista_text}>{item.qtd}</Text>
                    <TouchableOpacity onPress={()=>{add(index)}} style={styles.lista_btn}>
                      <Ionicons name="add-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.lista_text}>R$ {item.qtd*item.comida.preco}</Text>
                </View>
              )}
            />
          ):(
            <View><Text>CARREGANDO</Text></View>
          )}
          <Text style={styles.lista_text}>Total R$ {total.toString()}</Text>
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
  lista:{
    flexDirection: 'row',
    borderBottomWidth: 2
  },
  lista_view:{
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    textAlign:'center',
    width: '33%'
  },
  lista_btn:{
    alignContent:'center',
    alignItems:'center',
    textAlign:'center',
    width: '33%'
  },
  lista_text:{
    fontSize:20,
    textAlign:'center',
    width: '33%'
  }
});