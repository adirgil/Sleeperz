import React, { Component } from "react";


import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    Center,
    TouchableOpacity,
    TextInput,
    Button,
    ImageBackground,
    Image,
    I18nManager,
    Modal
} from "react-native";

// I18nManager.allowRTL(false);
// I18nManager.forceRTL(false);


export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.x = 0;
        this.ID = this.props.navigation.getParam("ID");
        this.state = {
            stateTeacher: "back",
            stateStudent: "up",
            techerPosition: 0,
            flagT: 0,
            flagS: 0,
            x__SaveState: 0,
            flagIfPress: 1,
            score: 0,
            highScore: 0,
            counter: 0,
            counterGameOver: 0,
            isModalVisible: false
        }
    }



    componentWillMount() {
        console.log(this.ID, "ffffffffffffffffffffffffffffff")
        this.fethchScoreByID();
        this.loop();
        // if (this.state.botonpresOrNot === 1) {
        //     this.x = this.x__SaveState;

    }



    changeTecher = () => {
        if (this.state.stateTeacher == "front")
            this.setState({
                stateTeacher: "back"
            });
        else
            this.setState({
                stateTeacher: "front"
            });
    }



    //  שינוי התמונה של המורה כל משך זמן מסויים
    loop = () => {


        setTimeout(
            () => {
                //console.log("hi");
                //var rand = Math.round(Math.random() * 50);

                // if (rand == 1) {
                //     console.log("rand=1");
                //     this.changeTecher();
                // }

                this.movingTecher();
                this.loop();
            },
            200
        );
    }







    movingTecher = () => {
        console.log(this.state.techerPosition);
        if (this.state.flagIfPress === 1) {

            var t = this.state.techerPosition + 6
            if (t < 120) {
                var rand = Math.round(Math.random() * 60);

                var frontOrBack = this.state.stateTeacher;
                if (rand < 10) {
                    console.log("rand=1");
                    frontOrBack = frontOrBack == "back" ? "front" : "back"
                }

                this.setState({
                    techerPosition: t,
                    stateTeacher: frontOrBack,
                    
                });
                if(this.state.stateStudent=="down"){
                    this.setState({
                        counter: this.state.counter + 1
                    })
                }
            }
            else {
                this.setState({ techerPosition: 0 });

            }
            this.GameOver();
        }

    }


    GameOver = () => {

        if (this.state.stateStudent == "down" && this.state.stateTeacher == "front") {
            tempScore = this.state.counterGameOver + 1
            this.setState({ counterGameOver: tempScore });
        }
        if (this.state.counterGameOver == 5) {
            
             alert("G A M E  O V E R !!!");
            this.updateUser();
            this.setState({ counterGameOver: 0 , stateStudent:"up",
                            counter:0});
        }




    }

    changeTecher = () => {
        (this.state.flagIfPress === 0) ? this.setState({ flagIfPress: 1 }) : this.setState({ flagIfPress: 0 });

    }




    changeStudent = () => {
        if (this.state.stateStudent == "down")
            this.setState({
                stateStudent: "up"
            });
        else
            this.setState({
                stateStudent: "down"
            });
    }


    updateUser = async () => {
        const data = {
            ID: this.ID,
            score:this.state.counter
        }

        await fetch('http://ruppinmobile.tempdomain.co.il/site07/UsersService.asmx/UpdateUser', {
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

                },
                (error) => {
                    console.log("err post=", error);
                });
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
                            //score: p.score,
                            highScore: p.highScore
                        })
                        console.log("scoreeeeeeeeeeeeeeeeeee")
                    }

                },
                (error) => {
                    console.log("err post=", error);
                });
    }



    render() {



        return (
            // <View style={styles.container} >

            <ImageBackground source={require('../images/bg.png')}
                resizeMode="stretch"
                style={{ width: '100%', height: '100%', marginTop: StatusBar.currentHeight }}>

                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <Text style={styles.score}>Score:{this.state.counter}</Text>
                    <Text style={styles.score}>Best: {this.state.highScore}</Text>
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={() => this.changeTecher()}
                    >
                        <Text>Pause</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={() => this.props.navigation.navigate("OpeningPage")}>
                        <Text>Exit</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.5, flexDirection: "column-reverse" }}>


                    {/* <View style={{ marginLeft: this.state.HowMachleft, flex: 0.5, backgroundColor: this.state.colorTeacher.backgroundColor, height: 100, width: 90 }}></View> */}
                    <Image
                        style={{

                            height: 160,
                            width: 100,
                            left: this.state.techerPosition,
                            bottom: 0.05 * Dimensions.get('window').height
                            //bottom: 75
                        }}
                        source={this.state.stateTeacher == "front" ? require("../images/Tb.png") : require("../images/Tf.png")}
                        resizeMode="stretch" />

                </View>
                <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                    <TouchableOpacity
                        onPress={() => this.changeStudent()}
                    >
                        <Image
                            style={{ flex: 1, height: 600, width: 220,top:-70 }}
                            source={this.state.stateStudent == "down" ? require("../images/Sd.png") : require("../images/Su.png")}
                            resizeMode="stretch"

                        />
                    </TouchableOpacity>



                </View>








            </ImageBackground>

        );



    }
}



const styles = StyleSheet.create({

    exit: {
        color: "white",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        backgroundColor: "#CECECE",
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
        top: 10,
        //left: "72%",
        //position: "absolute"
        marginLeft: 15
    },
    pause: {
        color: "white",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        backgroundColor: "#CECECE",
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
        top: 10,
        left: "45%",
        position: "absolute"
    },
    score: {
        color: "black",
        fontSize: 20,
        //elevation: 6,
        top: 15,
        //marginRight:40,
        marginLeft: 10
        //marginRight:20

        //left: "6%",
        //position: "absolute"

    },
    Click: {
        alignItems: "center",
        justifyContent: "center",
        height: '30%',
        width: '40%',
        backgroundColor: "#CECECE",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 6,
        //top: 500,
        //left: "30%",
        //position: "absolute"


    },

});