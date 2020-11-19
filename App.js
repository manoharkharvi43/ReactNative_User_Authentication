import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login_page from './Components/Login_page'

export default function App() {
	return (
		<View>
			<Login_page/>
		</View>
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
