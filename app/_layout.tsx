import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* ignore system bar for Android */}
      <StatusBar style="dark" translucent={false} />
      {/* ignore system bar for iOS */}
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </>
  );
}
