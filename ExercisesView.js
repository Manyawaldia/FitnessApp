import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, ScrollView, Grid, Header, List } from 'react-native';
import { Dimensions } from 'react-native';
import Modal from 'modal-react-native-web';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

class ExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            // activity:[]
            activity: {
                id: 0,
                name: '',
                duration: 0.0,
                calories: 0.0,
                date: ''
            },
            activities: []
        }

    }

    componentDidMount() {
        fetch('https://mysqlcs639.cs.wisc.edu/activities', {
            method: 'GET',
            headers: { 'x-access-token': this.props.accessToken }
        })
            .then(res => res.json())
            .then(res => {
                // console.log(Object.prototype.toString.call(res));
                // this.setState(prevState => ({
                //     activities: [...prevState.activities,
                //     res.map(obj => ({
                //         name: obj.name, duration: obj.duration,
                //         calories: obj.calories, date: obj.date
                //     }))
                //     ]
                // }));
                this.setState({ activities: res.activities });
                console.log(res)
            });
    }

    addActivity() {
        this.setState({
            isModalVisible: false
        }, () => fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.accessToken
            },
            //one activity at a time
            body: JSON.stringify({
                id: Math.random(),
                name: this.state.activity.name,
                duration: this.state.activity.duration,
                calories: this.state.activity.calories,
                date: ''

            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                alert("Your profile has been updated! Refresh to see changes");
            })
            .catch(err => {
                alert("Something went wrong! Verify you have filled out the fields correctly.");
            }));

    }
    delete(item) {
        this.setState({
            isModalVisible: false
        }, () => fetch('https://mysqlcs639.cs.wisc.edu/activities/' + item.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.accessToken
            },
            //one activity at a time
            body: JSON.stringify({
                id: item.id,
                name: this.state.activity.name,
                duration: this.state.activity.duration,
                calories: this.state.activity.calories,
                date: ''

            })
        })
            .then(res => res.json())
            .then(res => {
                alert("Your profile has been updated! Refresh to see changes");
            })
            .catch(err => {
                alert("Something went wrong! Verify you have filled out the fields correctly.");
            }));

    }

    backToLogin() {
        this.props.revokeAccessToken();
    }

    onNameChange(name) {

        this.setState({
            activity:
                { name: name }
        });
        // console.log(this.state.activity)
    }
    onDurationChange(text) {
        this.setState({
            activity:
                { duration: text }
        });
    }
    onCaloriesChange(text) {
        this.setState({
            activity:
                { calories: text }
        });
    }

    deleteActivity(item) {
        let i = 0
        for (i = 0; i < this.state.activities.length; i++) {
            if (item.id === this.state.activities[i].id) {
                this.setState(this.state.activities.splice(i, 1));
                this.delete(item)
            }
        }
    }

    render() {
        const items = this.state.activities.map((val) => {
            return (<li>{val.id}</li>)
        });
        return (

            // <ScrollView contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>   
            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
                <View style={styles.spaceSmall} />
                <View style={styles.workout}>
                    <Button color="#942a21" title="Add Workout" onPress={() => { this.setState({ isModalVisible: true }) }} />
                </View>
                <View style={styles.spaceSmall} />
                <Modal
                    style={styles.modal}
                    visible={this.state.isModalVisible}
                    animationType={"fade"}
                    transparent={false}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    {/*All views of Modal*/}
                    <View >
                        <View>
                            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Workout Name</Text>
                        </View>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Running"
                            placeholderTextColor="#d9bebd"
                            onChangeText={(text) => this.onNameChange(text)}
                            defaultValue={this.state.activity.name}
                            autoCapitalize="none" />
                        <View style={styles.spaceSmall}></View>
                        <View>
                            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                        </View>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="2200"
                            placeholderTextColor="#d9bebd"
                            onChangeText={(text) => this.onCaloriesChange(text)}
                            defaultValue={this.state.activity.calories}
                            autoCapitalize="none" />
                        <View>
                            <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration (in minutes) </Text>
                        </View>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="45"
                            placeholderTextColor="#d9bebd"
                            onChangeText={(text) => this.onDurationChange(text)}
                            defaultValue={this.state.activity.duration}
                            autoCapitalize="none" />

                        <View style={styles.space} />

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Button color="#942a21" style={styles.buttonInline} title="Add Activity" onPress={() => {
                                this.addActivity()
                            }} />
                            <View style={styles.spaceHorizontal} />
                            <Button color="#942a21" style={styles.buttonInline} title="Cancel" onPress={() => {
                                this.setState({ isModalVisible: false })
                            }} />
                        </View>
                    </View>
                </Modal>
                <View syle={styles.list}>
                    <FlatList
                        style={styles.list}
                        data={this.state.activities}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View >
                                <Text style={styles.text}>Activity Name: {item.name}</Text>
                                <Text style={styles.text}>Duration: {item.duration} minutes</Text>
                                <Text style={styles.text}>Calories: {item.calories}</Text>
                                <Text style={styles.text}>Date & Time: {moment().utcOffset('+0600').locale('en').format('YYYY-MM-DD hh:mm ')}</Text>
                                <View style={styles.spaceSmall} />

                                <View style={styles.button}>
                                    <Button color="#942a21" style={styles.buttonInline} title="Remove Activity" onPress={() => {
                                        this.deleteActivity(item)
                                    }} > Remove Activity </Button>
                                </View>
                                <View style={styles.spaceSmall} />

                            </View>}
                    />
                </View>
                <View style={styles.spaceSmall} />
                <View style={styles.spaceSmall} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Daily View" onPress={() => this.props.navigation.navigate('DailyTracker')} />
                    <View style={styles.spaceHorizontal} />
                    <Button color="#942a21" style={styles.buttonInline} title="Modify Goals" onPress={() => this.props.navigation.navigate('FitnessTracker')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        height: Dimensions.get('window').height
    },
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bigText: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 5
    },
    spaceSmall: {
        width: 20,
        height: 10,
    },
    space: {
        width: 20,
        height: 20,
    },
    spaceHorizontal: {
        display: "flex",
        width: 20
    },
    buttonInline: {
        display: "flex",
        padding: 20,
    },
    input: {
        width: 200,
        margin: 5,
        height: 40,
        borderColor: '#c9392c',
        borderWidth: 1
    },
    inputInline: {
        flexDirection: "row",
        display: "flex",
        width: 200,
        padding: 10,
        margin: 5,
        height: 40,
        borderColor: '#c9392c',
        borderWidth: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BCD4",
        height: '50%',
        width: '50%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        margin: 0
    },
    list: {
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black'
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    workout: {
        padding: 20,
        flex: 0,
        alignItems: 'flex-end',
        justifyContent: 'center',
        alignContent: 'center',
    }
});

export default ExercisesView;