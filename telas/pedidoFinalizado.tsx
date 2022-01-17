import axios from 'axios';
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PedidoFinalizado({route,navigation}:any) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity>
            <Text>Seu Pedido foi finalizado!</Text>
          </TouchableOpacity>
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