import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Colors } from '../constants';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    let baseStyle = 'items-center justify-center rounded-lg';
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle += ' px-3 py-2';
        break;
      case 'medium':
        baseStyle += ' px-4 py-3';
        break;
      case 'large':
        baseStyle += ' px-6 py-4';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle += disabled ? ' bg-gray-300' : ' bg-primary';
        break;
      case 'secondary':
        baseStyle += disabled ? ' bg-gray-200 border border-gray-300' : ' bg-white border border-primary';
        break;
      case 'success':
        baseStyle += disabled ? ' bg-gray-300' : ' bg-accent';
        break;
      case 'danger':
        baseStyle += disabled ? ' bg-gray-300' : ' bg-red-500';
        break;
      case 'outline':
        baseStyle += disabled ? ' border border-gray-300' : ' border border-primary bg-transparent';
        break;
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    let baseStyle = 'font-medium';
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle += ' text-sm';
        break;
      case 'medium':
        baseStyle += ' text-base';
        break;
      case 'large':
        baseStyle += ' text-lg';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'primary':
      case 'success':
      case 'danger':
        baseStyle += disabled ? ' text-gray-500' : ' text-white';
        break;
      case 'secondary':
      case 'outline':
        baseStyle += disabled ? ' text-gray-400' : ' text-primary';
        break;
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      className={getButtonStyle()}
      style={[
        { opacity: disabled ? 0.6 : 1 },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'success' || variant === 'danger' ? 'white' : Colors.primary}
        />
      ) : (
        <Text className={getTextStyle()} style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button; 