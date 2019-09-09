import React from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Center,
    TouchableOpacity,
    TextInput
} from "react-native";
var wi = Dimensions.get("window").width;


class Store extends React.Component {
    constructor(props) {
        super(props);
        this.ID = this.props.navigation.getParam("ID");
        this.userNameFB = this.props.navigation.getParam("userNameFB");
        this.state = {
            score: 0,
            highScore: 0,
        }
    }

    componentWillMount() {
        console.log(this.ID , this.userNameFB)
        if (this.ID !== undefined) {
            this.fethchScoreByID();
        } else {
            this.fethchScoreByUserName();
        }
    }

    fethchScoreByID = async () => {
        const data = {
            ID: this.ID
        }

        await fetch('http://ruppinmobile.tempdomain.co.il/site07/UsersService.asmx/SelectByID', {
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
                        this.setState({
                            score: p.score,
                            highScore: p.highScore
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


    fethchScoreByUserName = async () => {
        console.log('aaaa')
        const data = {
            userName: this.userNameFB
        }
        console.log(this.userNameFB);
        await fetch('http://ruppinmobile.tempdomain.co.il/site07/UsersService.asmx/SelectByUserName', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json;',
            }),
            body: JSON.stringify(data)
        })
            .then(res => {console.log('bbb',res);return res.json()}
            )
            .then(
                (result) => {
                    console.log(result)
                    let p = JSON.parse(result.d);
                    if (p != null) {
                        console.log(p)
                        this.setState({
                            score: p.score,
                            highScore: p.highScore
                        })
                    }
                },
                (error) => {
                    console.log("err post=", error);
                });
    }



    render() {
        return (

            <View style={{
                display: "flex", flex: 1, flexDirection: "column", alignItems: 'center',
                justifyContent: "space-between"
            }} >


                <View style={styles.header} >

                </View>
                <TouchableOpacity
                    style={styles.BackButon}
                    onPress={() => this.props.navigation.navigate("OpeningPage")}
                >
                    <Text>Back</Text>
                </TouchableOpacity>

                <View style={{ flex: 0.9 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.Store}> Store </Text>
                        <Text style={styles.NoticeText}> Notice! Your Score is Your money! </Text>
                        <Text style={styles.YourScoreText}> Your Score: </Text>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 50 }}>{this.state.score}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.3, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', }}>
                        <TouchableOpacity style={styles.inputPlace}>
                            <Text style={styles.itemText}>Life</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.inputPlace}>
                            <Text style={styles.itemText}>Stop time</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.inputPlace}>
                            <Text style={styles.itemText}>Power</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}></View>


            </View >
        );
    }
}

export default Store;

const styles = StyleSheet.create({

    Store: {
        flex: 0.3,
        fontSize: 60,
        textAlign: "center",

    },
    NoticeText: {
        flex: 0.2,
        fontSize: 20,
        textAlign: "center",

    },
    YourScoreText: {
        flex: 0.3,
        fontSize: 30,
        textAlign: "center",

    },
    itemText: {
        fontSize: 20,
        textAlign: "center",
        justifyContent: "center"
    },
    footer: {
        flex: 0.05,
        width: "100%",
        backgroundColor: "#7F7F7F",
    },
    header: {
        flex: 0.05,
        width: "100%",
        backgroundColor: "#7F7F7F",
        marginTop: StatusBar.currentHeight
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
        top: 25,
        left: "5%",
        position: "absolute"
    },
    inputPlace: {
        width: 100,
        height: 100,
        margin: 10,
        backgroundColor: "#C6C6C6",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 15
    },




});
