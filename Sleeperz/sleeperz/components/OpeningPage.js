import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";


const OpeningPage = props => {

    const heandleParams = () => {
        if (props.navigation.getParam("ID") !== undefined)
            props.navigation.navigate("Store",
                { ID: props.navigation.getParam("ID") })
        else
            props.navigation.navigate("Store",
                { userNameFB: props.navigation.getParam("userNameFB") })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.05, marginTop: StatusBar.currentHeight + 10, alignItems: "flex-end" }}>
                <TouchableOpacity style={{
                    width: '25%',
                    height: '100%',
                    padding: 20,
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
                }}
                    onPress={() => props.navigation.navigate("Login")}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", flex: 0.65 }}>

                <Text style={{
                    fontSize: 60,
                    fontWeight: "bold",
                }}>Sleeperz</Text>
                <Image source={require("../images/loginBG.png")}
                    resizeMode="stretch"
                    style={{ width: 280, height: 280 }}
                ></Image>
            </View>
            <View style={{ flex: 0.4 }}>
                <View style={{ alignItems: "center", marginBottom: '5%' }}>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: '300',
                    }}>Hello {props.navigation.getParam("userName")} {props.navigation.getParam("userNameFB")}</Text>

                </View>


                <View style={{
                    display: "flex",
                    flexDirection: 'row-reverse',
                    justifyContent: "space-evenly",
                    flex: 0.6
                }}>
                    <TouchableOpacity
                        style={styles.mainTuchable}
                        onPress={() => props.navigation.navigate("GameScreen", { ID: props.navigation.getParam("ID") })}
                    >
                        <Image source={require("../images/playPic4.png")}
                            resizeMode="stretch"
                            style={styles.imageStyle}
                        ></Image>
                        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>Play</Text>
                    </TouchableOpacity>
                    {console.log(props.navigation.getParam("ID"))}
                    <TouchableOpacity
                        style={styles.mainTuchable}
                        onPress={heandleParams}
                    >
                        <Image source={require("../images/storePic2.png")}
                            resizeMode="stretch"
                            style={styles.imageStyle}
                        ></Image>
                        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>Store</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.mainTuchable} >
                        <Image source={require("../images/lbPic.png")}
                            resizeMode="stretch"
                            style={styles.imageStyle}
                        ></Image>
                        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>LeaderBoard</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}


export default OpeningPage;

const styles = StyleSheet.create({
    mainTuchable: {
        justifyContent:"center",
        borderRadius: 67,
        backgroundColor: "#C6C6C6",
        width: '32%',
        height: '100%',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3

        }
    },
    imageStyle: {
        width: '80%',
        height: 60,
        alignSelf: "center"
    }

});