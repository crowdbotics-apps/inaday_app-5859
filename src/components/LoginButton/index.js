import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoginButton = ({
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
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#3AC0B8',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default LoginButton;