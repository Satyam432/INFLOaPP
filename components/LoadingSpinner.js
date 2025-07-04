import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from '../constants';

const LoadingSpinner = ({
  size = 'large',
  color = Colors.primary,
  text,
  style,
  fullScreen = false,
  ...props
}) => {
  const containerStyle = fullScreen 
    ? 'flex-1 justify-center items-center bg-white'
    : 'justify-center items-center py-4';
  
  return (
    <View className={containerStyle} style={style} {...props}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-gray-600 mt-2 text-center">
          {text}
        </Text>
      )}
    </View>
  );
};

export default LoadingSpinner; 