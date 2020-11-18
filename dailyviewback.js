import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class TodayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakfastName: "",
            breakfastCals: 0.0,
            lunchName: "",
            lunchCals: 0.0,
            dinnerName: "",
            dinnerCals: 0.0,
            snackName: "",
            snackCals: 0.0,
            exerciseName1: "",
            exerciseCals1: 0.0,
            exerciseDuration1: 0.0,
            exerciseName2: "",
            exerciseCals2: 0.0,
            exerciseDuration2: 0.0,
            exerciseName3: "",
            exerciseCals3: 0.0,
            exerciseDuration3: 0.0,
            exerciseName4: "",
            exerciseCals4: 0.0,
            exerciseDuration4: 0.0,
            activity: [],
        }

    }

    componentDidMount() {
        fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'GET',
            headers: { 'x-access-token': this.props.accessToken }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    // TODO: is this correct?
                    // breakfastName: res.breakfastName,
                    // breakfastCals: res.breakfastCals,
                    // lunchName: res.lunchName,
                    // lunchCals: res.lunchCals,
                    // dinnerName: res.dinnerName,
                    // dinnerCals: res.dinnerCals,
                    // snackName: res.snackName,
                    // snackCals: res.snackCals,
                    exerciseName1: res.exerciseName1,
                    exerciseCals1: res.exerciseCals1,
                    exerciseDuration1: res.exerciseDuration1,
                    exerciseName2: res.exerciseName2,
                    exerciseCals2: res.exerciseCals2,
                    exerciseDuration2: res.exerciseDuration2,
                    exerciseName3: res.exerciseName3,
                    exerciseCals3: res.exerciseCals3,
                    exerciseDuration3: res.exerciseDuration3,
                    exerciseName4: res.exerciseName4,
                    exerciseCals4: res.exerciseCals4,
                    exerciseDuration4: res.exerciseDuration4,

                });
            });

    }

    handleSaveProfile() {
        this.setState({
            exerciseCals: parseFloat(this.state.exerciseCals),
            exerciseDuration: parseFloat(this.state.exerciseDuration)
        }, () => fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.accessToken
            },
            body: JSON.stringify({
                exerciseName: this.state.exerciseName,
                exerciseCals: this.state.exerciseCals,
                exerciseDuration: this.state.exerciseDuration
            })
        })
            .then(res => res.json())
            .then(res => {
                alert("Your profile has been updated!");
            })
            .catch(err => {
                alert("Something went wrong! Verify you have filled out the fields correctly.");
            }));

    }

    handleAddActivitiy() {
        this.setState({
            exerciseCals: parseFloat(this.state.exerciseCals),
            exerciseDuration: parseFloat(this.state.exerciseDuration)
        }, () => fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.accessToken
            },
            body: JSON.stringify({
                exerciseName: this.state.exerciseName,
                exerciseCals: this.state.exerciseCals,
                exerciseDuration: this.state.exerciseDuration
            })
        })
            .then(response => response.json())
            .then(newData => {
                if (newData.message === "User created!") {
                    alert("Account Registered. User can now sign in")
                    dispatch({ type: 'LOGIN', token: newData.token, username: userData.username });
                } else {
                    alert(newData.message)
                }
            })
        )
    }

    addToActivityArr = () => {
        const activity = {
            name : "",
            duration: "",
            calories: "",
            date: Date.now()
        };
        this.setState({ activity: [...this.state.notes, note] });
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
                <View style={styles.space} />
                <Text style={{ textAlignVertical: "center", fontWeight: "700", fontSize: 20 }}>Log your workout for today!</Text>
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Workout Name</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Running"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseName1) => this.setState({ exerciseName1: exerciseName1 })}
                    defaultValue={this.state.exerciseName1}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseCals1) => this.setState({ exerciseCals1: exerciseCals1 })}
                    defaultValue={this.state.exerciseCals1}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration (in minutes) </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="45"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseDuration1) => this.setState({ exerciseDuration1: exerciseDuration1 })}
                    defaultValue={this.state.exerciseDuration1}
                    autoCapitalize="none" />

                <View style={styles.space} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Add Workout" onPress={() => this.handleAddActivitiy()} />
                    <View style={styles.spaceHorizontal} />
                </View>
                <View style={styles.space} />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Workout Name</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Running"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseName2) => this.setState({ exerciseName2: exerciseName2 })}
                    defaultValue={this.state.exerciseName2}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseCals2) => this.setState({ exerciseCals2: exerciseCals2 })}
                    defaultValue={this.state.exerciseCals2}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration (in minutes) </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="45"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseDuration2) => this.setState({ exerciseDuration2: exerciseDuration2 })}
                    defaultValue={this.state.exerciseDuration2}
                    autoCapitalize="none" />

                <View style={styles.space} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Add Workout" onPress={() => this.handleAddActivitiy()} />
                    <View style={styles.spaceHorizontal} />
                </View>

                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Workout Name</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Running"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseName3) => this.setState({ exerciseName3: exerciseName3 })}
                    defaultValue={this.state.exerciseName3}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseCals3) => this.setState({ exerciseCals3: exerciseCals3 })}
                    defaultValue={this.state.exerciseCals3}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration (in minutes) </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="45"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseDuration3) => this.setState({ exerciseDuration3: exerciseDuration3 })}
                    defaultValue={this.state.exerciseDuration3}
                    autoCapitalize="none" />

                <View style={styles.space} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Add Workout" onPress={() => this.handleAddActivitiy()} />
                    <View style={styles.spaceHorizontal} />
                </View>
                <View style={styles.space} />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Workout Name</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Running"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseName3) => this.setState({ exerciseName3: exerciseName3 })}
                    defaultValue={this.state.exerciseName3}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories Burned</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseCals3) => this.setState({ exerciseCals3: exerciseCals3 })}
                    defaultValue={this.state.exerciseCals3}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Duration (in minutes) </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="45"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(exerciseDuration3) => this.setState({ exerciseDuration3: exerciseDuration3 })}
                    defaultValue={this.state.exerciseDuration3}
                    autoCapitalize="none" />

                <View style={styles.space} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Add Workout" onPress={() => this.handleAddActivitiy()} />
                    <View style={styles.spaceHorizontal} />
                    <Button color="#942a21" style={styles.buttonInline} title="Modify Goals" onPress={() => this.props.navigation.navigate('FitnessTracker')} />
                </View>
                {/* <Text style={{ textAlignVertical: "center", fontWeight: "700", fontSize: 20 }}>Log your meals!</Text>
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Breakfast Name</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(breakfastName) => this.setState({ breakfastName: breakfastName })}
                    value={this.state.goalDailyCalories + ""}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(breakfastName) => this.setState({ breakfastName: breakfastName })}
                    value={this.state.goalDailyCalories + ""}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Lunch</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="52"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(goalDailyProtein) => this.setState({ goalDailyProtein: goalDailyProtein })}
                    value={this.state.goalDailyProtein + ""}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(breakfastName) => this.setState({ breakfastName: breakfastName })}
                    value={this.state.goalDailyCalories + ""}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Dinner</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="130"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(goalDailyCarbohydrates) => this.setState({ goalDailyCarbohydrates: goalDailyCarbohydrates })}
                    value={this.state.goalDailyCarbohydrates + ""}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(breakfastName) => this.setState({ breakfastName: breakfastName })}
                    value={this.state.goalDailyCalories + ""}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}></View>
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Snack</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="35"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(goalDailyFat) => this.setState({ goalDailyFat: goalDailyFat })}
                    value={this.state.goalDailyFat + ""}
                    autoCapitalize="none" />
                <View>
                    <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Calories </Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="2200"
                    placeholderTextColor="#d9bebd"
                    onChangeText={(breakfastName) => this.setState({ breakfastName: breakfastName })}
                    value={this.state.goalDailyCalories + ""}
                    autoCapitalize="none" />
                <View style={styles.spaceSmall}/> */}

                <View style={styles.spaceSmall} />
                {/* this is for meals */}
                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Save Info" onPress={() => this.handleAddActivitiy()} />
                    <View style={styles.spaceHorizontal} />
                    <Button color="#942a21" style={styles.buttonInline} title="Modify Goals" onPress={() => this.props.navigation.navigate('FitnessTracker')} />
                </View> */}
                <View style={styles.space} />

            </ScrollView>
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
    scrollViewContainer: {},
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
        display: "flex"
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
    }
});

export default TodayView;