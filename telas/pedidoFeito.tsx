import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PedidoFeito({route,navigation}:any) {
  const [isSelected, setSelection] = useState(false);
  const pedido = route.params.pedido;
  const usuario = route.params.usuario;
  const [nome, setNome] = React.useState([]);
  const hasUnsavedChanges = Boolean(false);
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
           <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>Do you like React Native?</Text>
              </View>
              <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
            </View>
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