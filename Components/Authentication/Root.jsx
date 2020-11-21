import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Login_page from "./Login_page";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Homepage from "../MainComps/Homepage";
import AuthToken from "../AuthToken";

export const errorMessage = createContext();

const Root = ({ navigation }) => {
	const [error, seterror] = useState("");
	const [user, setuser] = useState("");

	const url = "http://'YOUR IP ADDRESS':4000/login";

	const go_to_siginPage = () => {
		navigation.navigate("signinpage");
		seterror("");
	};

	//login
	const submitted_form = async (data) => {
		const datas = JSON.stringify({
			email: data.email,
			password: data.password,
		});
		axios
			.post(url, datas, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
			})
			.then((response) => {
				const user_id = jwtDecode(response.data);
				setuser(user_id._id);
				AuthToken.store_token(user_id._id);
			})
			.catch((error) => {
				seterror(error.response.data);
			});
	};

	//getting auth tokens of logged user

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
			<errorMessage.Provider value={error}>
				{user ? (
					<Homepage logout={handle_logout} />
				) : (
					<Login_page
						go_to_sigin={go_to_siginPage}
						submit_fields={(data) => submitted_form(data)}
					/>
				)}
			</errorMessage.Provider>
		</>
	);
};

const styles = StyleSheet.create({});

export default Root;
