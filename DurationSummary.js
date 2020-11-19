import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
class DurationSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            activity: {
                id: 0,
                name: '',
                duration: 0.0,
                calories: 0.0,
                date: ''
            },
            activities: [],
            totalMins: 0.0,
            firstName: "",
            lastName: "",
            goalDailyCalories: 0.0,
            goalDailyProtein: 0.0,
            goalDailyCarbohydrates: 0.0,
            goalDailyFat: 0.0,
            goalDailyActivity: 0.0,
            minsLeft:0.0
        }
        const mins = 0;

    }
    componentDidMount() {
        fetch('https://mysqlcs639.cs.wisc.edu/activities', {
            method: 'GET',
            headers: { 'x-access-token': this.props.accessToken }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ activities: res.activities });
                // console.log(res)
            });
            fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
                method: 'GET',
                headers: { 'x-access-token': this.props.accessToken }
              })
                .then(res => res.json())
                .then(res => {
                  this.setState({
                    firstName: res.firstName,
                    lastName: res.lastName,
                    goalDailyCalories: res.goalDailyCalories,
                    goalDailyProtein: res.goalDailyProtein,
                    goalDailyCarbohydrates: res.goalDailyCarbohydrates,
                    goalDailyFat: res.goalDailyFat,
                    goalDailyActivity: res.goalDailyActivity
                  });
                });
                    // c
    }

    totalMinutes(){
        let tot = 0;

        for (var i = 0, l = this.state.activities.length; i < l; i++) {
           tot = tot + this.state.activities[i].duration;
        }
        // this.setState({totalMins:tot});
        this.state.totalMins = tot;
        // console.log(this.state.totalMins);

    }

    render() {
        this.mins = this.totalMinutes();
        this.state.minsLeft = this.state.goalDailyActivity- this.state.totalMins;
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
                <View style={styles.spaceSmall} />
                <View style={styles.list}>
                    <Text style={styles.text}>Your Daily Activity Goal: {this.state.goalDailyActivity}</Text>
                    <Text style={styles.text}>Minutes you exercised today: {this.state.totalMins} </Text>
                    <Text style={styles.text}>Minutes you still need to reach goal:{this.state.minsLeft} </Text>
                </View>
                <View style={styles.spaceSmall} />
                <View style={styles.spaceSmall} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button color="#942a21" style={styles.buttonInline} title="Log More Exercises" onPress={() => this.props.navigation.navigate('Exercise')} />
                    <View style={styles.spaceHorizontal} />
                    <Button color="#942a21" style={styles.buttonInline} title="Daily View" onPress={() => this.props.navigation.navigate('DailyTracker')} />      
                </View>
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

export default DurationSummary;