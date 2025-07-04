import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';

const Card = ({
  children,
  onPress,
  variant = 'default',
  shadow = true,
  padding = 'medium',
  style,
  ...props
}) => {
  const getCardStyle = () => {
    let baseStyle = 'bg-white rounded-lg';
    
    // Shadow
    if (shadow) {
      baseStyle += ' shadow-sm';
    }
    
    // Padding
    switch (padding) {
      case 'none':
        break;
      case 'small':
        baseStyle += ' p-3';
        break;
      case 'medium':
        baseStyle += ' p-4';
        break;
      case 'large':
        baseStyle += ' p-6';
        break;
    }
    
    // Variant styles
    switch (variant) {
      case 'default':
        baseStyle += ' border border-gray-200';
        break;
      case 'elevated':
        baseStyle += ' shadow-md';
        break;
      case 'outlined':
        baseStyle += ' border-2 border-primary';
        break;
      case 'success':
        baseStyle += ' border border-green-200 bg-green-50';
        break;
      case 'warning':
        baseStyle += ' border border-yellow-200 bg-yellow-50';
        break;
      case 'error':
        baseStyle += ' border border-red-200 bg-red-50';
        break;
      case 'info':
        baseStyle += ' border border-blue-200 bg-blue-50';
        break;
    }
    
    return baseStyle;
  };
  
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      className={getCardStyle()}
      style={[
        shadow && {
          shadowColor: Colors.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card; 