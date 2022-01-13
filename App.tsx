import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
/*TELAS*/
import Login from './telas/login';
import Cadastro from './telas/cadastro';
import Inicio from './telas/inicio';
import Menu from './telas/menu';
import Pedido from './telas/pedido';
import Comanda from './telas/comanda';
import PedidoFeito from './telas/pedidoFeito';
import PedidoFinalizado from './telas/pedidoFinalizado';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="pedido"
            component={Pedido}
            options={{
              headerShown: true,
              headerTitle: 'Pedido'
            }}
          />
          <Stack.Screen
            name="comanda"
            component={Comanda}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="PedidoFeito"
            component={PedidoFeito}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="PedidoFinalizado"
            component={PedidoFinalizado}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
