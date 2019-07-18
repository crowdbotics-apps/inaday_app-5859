import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FBButton = ({
  title,
  style,
  onPress
}) => (
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={onPress}
  >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '6.25%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default FBButton;