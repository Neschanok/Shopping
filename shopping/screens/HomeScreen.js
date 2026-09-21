import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';
import ButtonComponent from '../components/ButtonComponent';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
  const { items, toggleBought, removeItem } = useContext(ShoppingListContext);

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      {/* Checkbox: marker varen som købt/ikke købt */}
      <TouchableOpacity
        style={[styles.checkbox, item.bought && styles.checkboxChecked]}
        onPress={() => toggleBought(item.id)}
      >
        {item.bought && <Text style={styles.checkboxMark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.itemTextWrapper}>
        <Text style={[styles.itemName, item.bought && styles.itemNameBought]}>
          {item.name}
        </Text>
        <Text style={styles.itemMeta}>
          {item.quantity} · {item.category}
        </Text>
      </View>

      {/* Slet-knap for den enkelte vare */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const boughtCount = items.filter((i) => i.bought).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Min indkøbsliste</Text>
        <Text style={styles.subHeader}>
          {items.length} varer i alt · {boughtCount} lagt i kurven
        </Text>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Listen er tom. Tryk på "Tilføj vare" for at komme i gang.
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />

        {/* Navigerer til AddItemScreen */}
        <ButtonComponent
          title="+ Tilføj vare"
          onPress={() => navigation.navigate('AddItem')}
        />

        <ButtonComponent
          title="Indstillinger"
          variant="secondary"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </SafeAreaView>
  );
}