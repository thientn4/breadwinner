import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Pressable } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'black', 
      tabBarButton: (props) => <Pressable {...props} android_ripple={null} />, // this here
    }}>
      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          title: 'Menu',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="pizza-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          headerShown: false,
          title: 'Plan',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          headerShown: false,
          title: 'Grocery',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cart-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
