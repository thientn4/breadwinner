import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Navigate to '/menu' after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/menu')
    }, 1000); // 3000 milliseconds = 3 seconds

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Depend on fadeAnim and router
  return (
    <View // Use Animated.View for fade effect
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <Image
        style={{
          width: '40%',
          height: undefined,
          aspectRatio: 1,
        }}
        source={require('../assets/images/icon.png')}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Breadwinner</Text>
    </View>
  );
}