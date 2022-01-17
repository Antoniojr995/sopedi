import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Menu({route,navigation}) {
  const mesa = route.params.mesa;
  const comanda = route.params.comanda;
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.lista}>
            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('pedido',{tipo:1,mesa:mesa,comanda:comanda})}}>
                <Text style={styles.btn_text}>Hamburges</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('pedido',{tipo:2,mesa:mesa,comanda:comanda})}}>
                <Text style={styles.btn_text}>Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('pedido',{tipo:3,mesa:mesa,comanda:comanda})}}>
                <Text style={styles.btn_text}>Bebidas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('pedido',{tipo:4,mesa:mesa,comanda:comanda})}}>
                <Text style={styles.btn_text}>Especiais</Text>
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
  lista: {
    flexDirection: 'column',
    alignItems: 'center'
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