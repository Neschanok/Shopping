import React, { createContext, useState } from 'react';

// Deler indkøbslisten mellem alle screens, så vi undgår at sende
// store data-objekter gennem navigation-params.
export const ShoppingListContext = createContext();

let nextId = 4;

export function ShoppingListProvider({ children }) {
  const [items, setItems] = useState([
    { id: '1', name: 'Mælk', quantity: '1 L', category: 'Køl', bought: false },
    { id: '2', name: 'Æbler', quantity: '6 stk', category: 'Frugt & grønt', bought: false },
    { id: '3', name: 'Havregryn', quantity: '500 g', category: 'Tørvarer', bought: true },
  ]);

  const addItem = (name, quantity, category) => {
    const newItem = {
      id: String(nextId++),
      name: name.trim(),
      quantity: quantity.trim() || '1 stk',
      category: category || 'Andet',
      bought: false,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const toggleBought = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearList = () => {
    setItems([]);
  };

  return (
    <ShoppingListContext.Provider
      value={{ items, addItem, toggleBought, removeItem, clearList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}