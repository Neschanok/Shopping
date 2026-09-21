import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';
import ButtonComponent from '../components/ButtonComponent';
import styles from '../styles/styles';

const CATEGORIES = ['Frugt & grønt', 'Køl', 'Tørvarer', 'Brød', 'Andet'];

export default function AddItemScreen({ navigation }) {
  const { addItem } = useContext(ShoppingListContext);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Manglende navn', 'Skriv venligst et navn på varen.');
      return;
    }
    addItem(name, quantity, category);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.header}>Tilføj vare</Text>
        <Text style={styles.subHeader}>Udfyld detaljerne og gem på listen</Text>

        <Text style={styles.label}>Varenavn</Text>
        <TextInput
          style={styles.input}
          placeholder="Fx bananer"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Mængde</Text>
        <TextInput
          style={styles.input}
          placeholder="Fx 1 kg"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Kategori</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                category === cat && styles.categoryChipSelected,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  category === cat && styles.categoryChipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ButtonComponent title="Gem vare" onPress={handleSave} />

        <ButtonComponent
          title="Annuller"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}