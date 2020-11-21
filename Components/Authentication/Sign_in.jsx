import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Input } from "react-native-elements";
import Screen_View from "../Screen_View";
import { Button } from "react-native-elements";
import axios from "axios";
import AuthToken from '../AuthToken'
import jwtDecode from 'jwt-decode'
import Homepage from '../MainComps/Homepage'

export default function Sign_in() {
	const [inputs, setinputs] = useState({
		username: "",
		password: "",
		email: "",
		confirm_password: "",
	});
	const [error, seterror] = useState("");
	const [user, setuser] = useState("");
	const url = "http://'YOUR IP ADDRESS':4000/signin";

	const handle_signin = async () => {
		if (inputs.password === inputs.confirm_password) {
			const body = JSON.stringify({
				username: inputs.username,
				password: inputs.password,
				email: inputs.email,
			});

			axios
				.post(url, body, {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
				})
				.then((response) =>{
					const user_id = jwtDecode(response.data);
				   setuser(user_id._id);
				   AuthToken.store_token(user_id._id);
				})
				.catch((error) => {
					seterror(error.response.data);
				});
		} else return seterror(`password doesn't match`);
	};
	const getToken = async () => {
		const token = await AuthToken.get_token();
		if (!token) return null;
		else return setuser(token);
	};

	useEffect(() => {
		getToken();
	}, []);

	const handle_logout = () => {
		setuser("");
		AuthToken.delete_token();
	};
	return (
		<>

		    { user ? <Homepage logout={handle_logout} /> :  
			<Screen_View>
				<Input
					style={{ outline: "none" }}
					placeholder="username"
					leftIcon={
						<Icon name="user" size={22} color="black" type="font-awesome" />
					}
					label="username"
					onChangeText={(text) => setinputs({ ...inputs, username: text })}
				/>
				<Input
					style={{ outline: "none" }}
					placeholder="email"
					leftIcon={
						<Icon name="mail" size={22} color="black" type="font-awesome" />
					}
					label="email"
					onChangeText={(text) => setinputs({ ...inputs, email: text })}
				/>
				<Input
					style={{ outline: "none" }}
					placeholder="password"
					leftIcon={
						<Icon name="lock" size={22} color="black" type="font-awesome" />
					}
					label="password"
					onChangeText={(text) => setinputs({ ...inputs, password: text })}
					secureTextEntry={true}
				/>
				<Input
					style={{ outline: "none" }}
					placeholder="confirm password"
					leftIcon={
						<Icon name="lock" size={22} color="black" type="font-awesome" />
					}
					label="password"
					onChangeText={(text) =>
						setinputs({ ...inputs, confirm_password: text })
					}
					secureTextEntry={true}
					errorMessage={error ? error : null}
				/>
				<Button title="Submit" onPress={handle_signin} />
			</Screen_View>
}
		</>
	);
}

const styles = StyleSheet.create({});
