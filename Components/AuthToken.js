import AsyncStorage from '@react-native-community/async-storage'


const KEY = "authtoken";

const store_token = async token =>{
    try {
        return await AsyncStorage.setItem(KEY , token)
    } catch (error) {
        console.log(error)
    }
}

const get_token = async () =>{
    try {
        return await AsyncStorage.getItem(KEY)
    } catch (error) {
        console.log(error)
    }
}

const delete_token = async () =>{
    try {
        return await AsyncStorage.removeItem(KEY )
    } catch (error) {
        console.log(error)
    }
}

export default {delete_token,get_token,store_token}