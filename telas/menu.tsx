import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Menu({route,navigation}) {
  const mesa = route.params.mesa;
  const comanda = route.params.comanda;
  return (
    <SafeAreaView style={styles.container}>
        <View>
            <TouchableOpacity onPress={()=>{navigation.navigate('pedido',{tipo:1,mesa:mesa,comanda:comanda})}}>
                <Text>Hamburges</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('pedido',{tipo:2,mesa:mesa,comanda:comanda})}}>
                <Text>Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('pedido',{tipo:3,mesa:mesa,comanda:comanda})}}>
                <Text>Bebidas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('pedido',{tipo:4,mesa:mesa,comanda:comanda})}}>
                <Text>Especiais</Text>
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
});