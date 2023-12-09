import Auth from "Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhotoUploadForm from "PhotoUploadForm";
import PhotoGallery from "PhotoGallery";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Auth} />
        <Stack.Screen name="Upload" component={PhotoUploadForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
