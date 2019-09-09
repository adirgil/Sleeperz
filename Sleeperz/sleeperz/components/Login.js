import React from "react";
import Expo from 'expo';
import * as Facebook from 'expo-facebook';

import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Center,
    TouchableOpacity,
    TextInput,
    Image
} from "react-native";





class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userName = '';
        this.password = '';
        this.state = {
            isExist: false
        }
    }

   
    HeandleLogin = async () => {
        const data = {
            userName: this.userName,
            pass: this.password
        }
        if (data.userName === '' || data.pass === '') {
            alert("please enter User Name and Password...")
            return;
        }
        await fetch('http://ruppinmobile.tempdomain.co.il/site07/UsersService.asmx/UserLogin', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8',
            }),
            body: JSON.stringify(data)
        })
            .then(res => { return res.json() }
            )
            .then(
                (result) => {
                    let p = JSON.parse(result.d);
                    if (p != null) {
                        console.log(p)
                        this.props.navigation.navigate("OpeningPage", { userName: p.userName, ID: p.ID })
                        this.setState({
                            isExist: true
                        })
                    }
                    if (this.state.isExist === false) {
                        alert('Wrong username or password')
                    }
                },
                (error) => {
                    console.log("err post=", error);
                });
    }


    HeandleUserName = (e) => {
        this.userName = e
    }

    HeandlePassword = (e) => {
        this.password = e
    }


    render() {
        return (
            <View style={{
                display: "flex", flex: 1, flexDirection: "column", alignItems: 'center',
                justifyContent: "space-between"
            }} >

                <View style={styles.header} ></View>
                <Text style={styles.sleeperzText}>Sleeperz</Text>
                <View style={{ flex: 0.2 }}>
                    <Image source={require("../images/loginBG.png")}
                        resizeMode="stretch"
                        style={{ width: 280, height: 280 }}
                    ></Image>
                </View>
                <View style={{ flex: 0.3, justifyContent: "space-between" }}></View>
                <View style={{ flex: 0.3, justifyContent: "space-between", width: "70%" }}>
                    <Text style={styles.LoginText}>Login</Text>
                    <TextInput
                        placeholder="    Username"
                        placeholderTextColor="grey"
                        style={styles.inputPlace}
                        onChangeText={this.HeandleUserName}
                    />
                    <TextInput
                        placeholder="    Password"
                        placeholderTextColor="grey"
                        style={styles.inputPlace}
                        onChangeText={this.HeandlePassword}
                    />
                </View>
                <View style={{flexDirection:"row", }}>
                    <TouchableOpacity
                        style={styles.ConfirmButon}
                        onPress={() => this.props.navigation.navigate("SignUp")}
                    >
                        <Text>SignUp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.ConfirmButon}
                        onPress={() => this.HeandleLogin()}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer} ></View>

            </View>


        );
    }
};
export default Login;

const styles = StyleSheet.create({
    header: {
        flex: 0.05,
        width: "100%",
        backgroundColor: "#D8D8D8",
        marginTop: StatusBar.currentHeight
    },
    sleeperzText: {
        flex: 0.2,
        textAlign: "center",
        fontSize: 60,
        fontWeight: "bold",
    },
    LoginText: {
        flex: 0.2,
        fontSize: 20,
        textAlign: "center"
    },
    footer: {
        flex: 0.05,
        width: "100%",
        backgroundColor: "#D8D8D8",

    },

    inputPlace: {
        flex: 0.40,
        width: "100%",
        backgroundColor: "#C6C6C6",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 67,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 6
    },



    ConfirmButon: {
        flex: 0.3,
        marginTop:30,
        color: "#f64567",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: "30%",
        backgroundColor: "#939393",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 55,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },

    },
    BackButon: {
        color: "white",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        backgroundColor: "#939393",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 55,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 6,
        top: 30,
        left: "5%",
        position: "absolute",

    }
});
