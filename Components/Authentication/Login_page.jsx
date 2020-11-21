import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import Screen_View from "../Screen_View";
import { Text } from "react-native-elements";
import { errorMessage } from "./Root";

const App = ({ go_to_sigin, submit_fields }) => {
	const error_Message = useContext(errorMessage);

	const [input, setinput] = useState({
		email: "",
		password: "",
	});

	const submit_event = () => {
		submit_fields(input);
	};

	return (
		<>
			<Screen_View style={styles.container}>
				<Input
					inputContainerStyle={{ outline: "none" }}
					placeholder="email"
					leftIcon={
						<Icon name="mail" size={22} color="black" type="font-awesome" />
					}
					label="email"
					value={input.email}
					onChangeText={(text) => setinput({ ...input, email: text })}
					name="email"
					errorMessage={error_Message ? error_Message : null}
				/>

				<Input
					inputContainerStyle={{ outline: "none" }}
					placeholder="password"
					secureTextEntry={true}
					leftIcon={
						<Icon name="lock" size={22} color="black" type="font-awesome" />
					}
					label="password"
					value={input.password}
					onChangeText={(text) => setinput({ ...input, password: text })}
					name="password"
				/>

				<Button
					style={styles.button_input}
					title="Logn-in"
					onPress={submit_event}
				/>
				<View style={styles.signinLink_container}>
					<Text>Don't have an account ?</Text>
					<Pressable onPress={go_to_sigin} style={{}}>
						<Text style={{ color: "#3492eb", fontSize: 17 }}>Sign-in</Text>
					</Pressable>
				</View>
			</Screen_View>
		</>
	);
};

const styles = StyleSheet.create({
	button_input: {},

	signin_link: {
		fontSize: 15,
		margin: 10,
	},
	signinLink_container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
});
export default App;
