import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login_page from "./Components/Authentication/Login_page";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Sign_in from './Components/Authentication/Sign_in'
import Root from './Components/Authentication/Root'
import Homepage from "./Components/MainComps/Homepage";


export default function App() {
	const stack = createStackNavigator()
	return (
		<>
			<NavigationContainer>
			<stack.Navigator initialRouteName="root">
			<stack.Screen name="root" component={Root}   options={{ title: '' }} />
			<stack.Screen name="homepage" component={Homepage}   options={{ title: '' }} />
			<stack.Screen name="loginpage" component={Login_page}   options={{ title: '' }} />
			<stack.Screen name="signinpage" component={Sign_in}  options={{ title: ''}}  />
			</stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
