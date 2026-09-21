import React, { useContext } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';
import ButtonComponent from '../components/ButtonComponent';
import styles from '../styles/styles';

export default function SettingsScreen({ navigation }) {
  const { items, clearList } = useContext(ShoppingListContext);
  const boughtCount = items.filter((i) => i.bought).length;

  const handleClear = () => {
    Alert.alert(
      'Ryd listen',
      'Er du sikker på, at du vil slette alle varer?',
      [
        { text: 'Fortryd', style: 'cancel' },
        {
          text: 'Ryd listen',
          style: 'destructive',
          onPress: () => {
            clearList();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Indstillinger</Text>
        <Text style={styles.subHeader}>Overblik og handlinger for din liste</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Om appen</Text>
          <Text style={styles.infoText}>
            Indkøbsliste er lavet som en del af en skoleopgave. Appen lader
            dig tilføje varer, markere dem som købt og holde styr på, hvad
            der mangler i køleskabet.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Status</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Varer i alt</Text>
            <Text style={styles.statValue}>{items.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Lagt i kurven</Text>
            <Text style={styles.statValue}>{boughtCount}</Text>
          </View>
        </View>

        <ButtonComponent title="Ryd hele listen" variant="danger" onPress={handleClear} />

        <ButtonComponent
          title="Tilbage til listen"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
}