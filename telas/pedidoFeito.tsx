import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PedidoFeito({route,navigation}:any) {
  const [isSelected, setSelection] = useState(false);
  const pedido = route.params.pedido;
  const mesa = route.params.mesa;
  const [nome, setNome] = React.useState([]);
  const hasUnsavedChanges = Boolean(false);
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
           <Button
            onPress={()=>{
              navigation.navigate('Menu',{comanda:[],mesa:mesa});
            }}
            title="Fazer outro Pedido"
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