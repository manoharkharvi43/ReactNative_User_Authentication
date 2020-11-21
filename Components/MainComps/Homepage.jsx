import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default function Homepage({ logout }) {
	const handle_logout = () => {
		logout();
	};
	return (
		<View>
			<Text>Welcome to home page</Text>
			<Button title="logout" onPress={handle_logout} />
		</View>
	);
}

const styles = StyleSheet.create({});
