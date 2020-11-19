import React, { useState } from "react";
import { StyleSheet,  Platform, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";

const App = () => {
	const [input, setinput] = useState({
		email: "",
		password: "",
	});

	const submit_email = (text) => {
		setinput({
			...input,
			email: text,
		});
	};
	const submit_password = (text) => {
		setinput({
			...input,
			password: text,
		});
	};
	return (
		<>
			<SafeAreaView style={styles.container}>
				<Input
					style={styles.inputs}
					placeholder="email"
					leftIcon={
						<Icon name="mail" size={22} color="black" type="font-awesome" />
					}
					label="email"
					value={input.email}
					onChangeText={submit_email}
					name="email"
				/>

				<Input
					style={{ outline: "none" }}
					style={styles.inputs}
					placeholder="password"
					secureTextEntry={true}
					leftIcon={
						<Icon name="lock" size={22} color="black" type="font-awesome" />
					}
					label="password"
					value={input.password}
					onChangeText={submit_password}
					name="password"
				/>

				<Button
					style={styles.button_input}
					title="Logn-in"
					onPress={() =>
						input.password === "" || input.email === ""
							? alert(`email and password can't be empty`)
							: alert(`email is ${input.email} 
and password is ${input.password}`)
					}
				/>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginRight: 10,
		marginTop: Platform.OS === "android" ? 60 : 0,
	},

	button_input: {
		marginTop: "30px",
	},
});
export default App;
