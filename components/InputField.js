import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  secure = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  containerStyle,
  ...props
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(secure);
  const [isFocused, setIsFocused] = useState(false);
  
  const getContainerStyle = () => {
    let baseStyle = 'mb-4';
    return baseStyle;
  };
  
  const getInputContainerStyle = () => {
    let baseStyle = 'flex-row items-center border rounded-lg px-3 py-3';
    
    if (error) {
      baseStyle += ' border-red-500 bg-red-50';
    } else if (isFocused) {
      baseStyle += ' border-primary bg-white';
    } else {
      baseStyle += ' border-gray-300 bg-gray-50';
    }
    
    if (disabled) {
      baseStyle += ' bg-gray-100';
    }
    
    return baseStyle;
  };
  
  const getInputStyle = () => {
    let baseStyle = 'flex-1 text-base text-gray-900';
    
    if (multiline) {
      baseStyle += ' text-top';
    }
    
    return baseStyle;
  };
  
  return (
    <View className={getContainerStyle()} style={containerStyle}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      
      <View className={getInputContainerStyle()} style={style}>
        {leftIcon && (
          <View className="mr-3">
            <Ionicons 
              name={leftIcon} 
              size={20} 
              color={error ? Colors.error : isFocused ? Colors.primary : Colors.gray400} 
            />
          </View>
        )}
        
        <TextInput
          className={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray400}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecureEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          style={[
            { 
              minHeight: multiline ? numberOfLines * 20 : 'auto',
              textAlignVertical: multiline ? 'top' : 'center'
            },
            inputStyle
          ]}
          {...props}
        />
        
        {secure && (
          <TouchableOpacity
            className="ml-3"
            onPress={() => setIsSecureEntry(!isSecureEntry)}
          >
            <Ionicons 
              name={isSecureEntry ? 'eye-off' : 'eye'} 
              size={20} 
              color={Colors.gray400} 
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secure && (
          <TouchableOpacity
            className="ml-3"
            onPress={onRightIconPress}
          >
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color={error ? Colors.error : isFocused ? Colors.primary : Colors.gray400} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-sm text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default InputField; 