import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* ignore system bar for iOS (SafeAreaView) & android (marginTop) */}
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: StatusBar.currentHeight }}>
        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </>
  );
}
