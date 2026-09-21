import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const ButtonComponent = ({ title, onPress, variant = 'primary' }) => {
  const buttonStyle =
    variant === 'primary'
      ? styles.primaryButton
      : variant === 'danger'
      ? styles.dangerButton
      : styles.secondaryButton;

  const textStyle =
    variant === 'primary'
      ? styles.primaryButtonText
      : variant === 'danger'
      ? styles.dangerButtonText
      : styles.secondaryButtonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;