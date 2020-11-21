import React from "react";
import { StyleSheet, View, Platform } from "react-native";

export default function Screen({ children }) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		marginTop: Platform.OS === "android" ? 60 : 0,
		paddingLeft: 7,
		paddingRight: 7,
	},
});
