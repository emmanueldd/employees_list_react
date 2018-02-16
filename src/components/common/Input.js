import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText , placeholder, secureTextEntry}) => {
  const { inputStyle, labelStyle, ContainerStyle } = styles;

  return (
    <View style={ContainerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        style={inputStyle}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2 // Two third
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1 // One third
  },
  ContainerStyle: {
    height: 40,
    flexDirection: 'row',
    // textAlign: 'center',
    flex: 1 // One third
  }

}

export { Input };
