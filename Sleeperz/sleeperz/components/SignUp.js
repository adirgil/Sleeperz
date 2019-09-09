import React from "react";
import * as Facebook from 'expo-facebook';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Image
} from "react-native";

//"facebookScheme": "fb485114492035175",

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.userName = '';
        this.password = '';
        this.cPassword = '';
        this.state = {
            usersList: [],
        }
    }

    logInWithFB = async () => {
        try {
            console.log("try")
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('485114492035175', {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                console.log("hi")
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=email,name,picture.type(large)&access_token=${token}`);
                //.then(res=>res.json())
                //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                //this.props.navigation.navigate("Login")
                //console.log((await response.json()));
                const answer = (await response.json()).name;
                //console.log(response.name);
                //return await response.json()
                ////////////////////////////////////////////////////
                //this.HeandleInsertUserWithFB(response.name)
                this.HeandleInsertUserWithFB(answer)
                this.props.navigation.navigate("OpeningPage", { userNameFB: answer })
                ///////////////////////////////////////////////////
            } else {
                // type === 'cancel'
                console.log("else")
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
            console.log("catch")
        }
    }



    HeandleInsertUserWithFB = async (userName) => {
        console.log("aaa")
        await fetch("http://ruppinmobile.tempdomain.co.il/site07/UsersService.asmx/InsertUserWithFB", {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json;',
            }),
            body: JSON.stringify({ userName }, console.log("bbb"))
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("rrrr")
                    let p = JSON.parse(result.d);
                    if (p === 2) {
                        this.props.navigation.navigate("OpeningPage", { userName: p.userName })
                        return;
                    }
                    //this.props.navigation.navigate("Login")
                    console.log(p)
                    this.setState(prev => ({
                        usersList: prev.usersList.concat({ userName })
                    }));
                    console.log(p);

                },
                (error) => {
                    console.log("err post=", error);
                });

    }



    HeandleInsertUser = async () => {
        const user = {
            userName: this.userName,
            pass: this.password,
            cPass: this.cPassword
        }

        if (user.userName === '' || user.pass === '' || user.cPass === '') {
            alert("please enter User Name and Password...")
        } else if (user.pass !== user.cPass) {
            alert("passwords DO NOT match")
        } else {
            await fetch("http://ruppinmobile.tempdomain.co.il/site07/UsersService.asmx/InsertUser", {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json;',
                }),
                body: JSON.stringify(user)
            })
                .then(res => { console.log("res=", res); return res.json() })
                .then(
                    (result) => {
                        console.log("result=", result)
                        let p = JSON.parse(result.d);
                        console.log("p= ", p)
                        if (p === 0) {
                            alert("User is already exsist");
                            return;
                        }
                        this.props.navigation.navigate("Login")
                        this.setState(prev => ({
                            usersList: prev.usersList.concat(user)
                        }));
                        console.log(p);

                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }
    }

    HeandleUserName = (e) => {
        this.userName = e
    }

    HeandlePassword = (e) => {
        this.password = e
    }

    HeandleCPassword = (e) => {
        this.cPassword = e
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
                <View style={{
                    flex: 0.1,
                    width: '25%',
                    height: '100%',
                    borderStyle: "solid",
                    borderColor: "black",
                    backgroundColor: '#a6a6a6',
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: '2%',
                    borderColor: "#000000",
                    borderWidth: 1,
                    borderRadius: 55,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3
                    }
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", flex: 0.2, justifyContent: "center" }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: "bold",
                    }}>SignUp Page</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: "center" }}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="grey"
                        onChangeText={this.HeandleUserName}
                        style={styles.inputPlace}
                        onChangeText={this.HeandleUserName}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="grey"
                        onChangeText={this.HeandlePassword}
                        style={styles.inputPlace}
                        onChangeText={this.HeandlePassword}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="grey"
                        onChangeText={this.HeandleCPassword}
                        style={styles.inputPlace}
                    />
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TouchableOpacity
                        style={styles.ConfirmButon}
                        onPress={this.HeandleInsertUser}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <Text>Connect with Facebook</Text>
                    <TouchableOpacity
                        //style={styles.FCbtn}
                        onPress={this.logInWithFB}
                    >
                        <Image source={require("../images/facebook.png")}
                            resizeMode="stretch"
                            style={{height:50 , width:50}}
                        ></Image>
                        {/* <Text style={{ fontSize: 20 }}>F</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


}

export default SignIn;

const styles = StyleSheet.create({
    inputPlace: {
        borderColor: "#000000",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 60,
        padding: 20,
        width: '60%',
        marginBottom: 10
    },
    ConfirmButon: {
        flex: 0.6,
        color: "#f64567",
        //  height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
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
    FCbtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4267b2",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        width: "20%",
        height: "30%",
        borderRadius: 55,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
    }
})