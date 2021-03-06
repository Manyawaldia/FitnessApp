import React from 'react';

import LoginView from './LoginView';
import SignupView from './SignupView';

import TodayView from './TodayView'
import ExercisesView from './ExercisesView'
import ProfileView from './ProfileView'
import DurationSummary from './DurationSummary'

// Import vector icons
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity, Image, View, Text, AsyncStorage } from 'react-native';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: undefined,
      username: undefined
    }

    this.login = this.login.bind(this);
    this.revokeAccessToken = this.revokeAccessToken.bind(this);
    this.SignoutButton = this.SignoutButton.bind(this);
  }

  /**
   * Store the username and accessToken here so that it can be
   * passed down to each corresponding child view.
   */
  login(username, accessToken) {
    this.setState({
      username: username,
      accessToken: accessToken
    });
  }

  /**
   * Revokes the access token, effectively signing a user out of their session.
   */
  revokeAccessToken() {
    this.setState({
      accessToken: undefined
    });
  }

  /**
   * Defines a signout button... Your first TODO!
   */
  SignoutButton = () => {
    return <>
      <View style={{ flexDirection: 'row', marginRight: 25 }}>
        <TouchableOpacity onPress={() => this.revokeAccessToken()}>
          <Icon name="log-out" style={{ paddingLeft: '20px', paddingRight: '50px' }} size={30} color="#900" />
        </TouchableOpacity>
      </View>
    </>
  }

  /**
   * Note that there are many ways to do navigation and this is just one!
   * I chose this way as it is likely most familiar to us, passing props
   * to child components from the parent.
   * 
   * Other options may have included contexts, which store values above
   * (similar to this implementation), or route parameters which pass
   * values from view to view along the navigation route.
   * 
   * You are by no means bound to this implementation; choose what
   * works best for your design!
   */
  render() {

    // Our primary navigator between the pre and post auth views
    // This navigator switches which screens it navigates based on
    // the existent of an access token. In the authorized view,
    // which right now only consists of the profile, you will likely
    // need to specify another set of screens or navigator; e.g. a
    // list of tabs for the Today, Exercises, and Profile views.
    let AuthStack = createStackNavigator();

    return (
      <NavigationContainer>
        <AuthStack.Navigator>
          {!this.state.accessToken ? (
            <>
              <AuthStack.Screen
                name="SignIn"
                options={{
                  title: 'Fitness Tracker Welcome',
                }}
              >
                {(props) => <LoginView {...props} login={this.login} />}
              </AuthStack.Screen>
              <AuthStack.Screen
                name="SignUp"
                options={{
                  title: 'Fitness Tracker Signup',
                }}
              >
                {(props) => <SignupView {...props} />}
              </AuthStack.Screen>
            </>
          ) : (
              <>
                <AuthStack.Screen
                  name="Exercise"
                  options={{
                    headerLeft: this.SignoutButton,
                    title: 'Add Activity',
                  }}
                >
                  {(props) => <ExercisesView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
                </AuthStack.Screen>
                <AuthStack.Screen name="DailyTracker" options={{
                  headerLeft: this.SignoutButton,
                  title: 'Daily View',
                }}>
                  {(props) => <TodayView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
                </AuthStack.Screen>
                <AuthStack.Screen name="FitnessTracker" options={{
                  headerLeft: this.SignoutButton,
                  title: 'User Profile',
                }}>
                  {(props) => <ProfileView {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
                </AuthStack.Screen>
                <AuthStack.Screen name="Duration" options={{
                  title: 'Exercise Ratio',
                  headerLeft: this.SignoutButton,
                }}>
                  {(props) => <DurationSummary {...props} username={this.state.username} accessToken={this.state.accessToken} revokeAccessToken={this.revokeAccessToken} />}
                </AuthStack.Screen>
              </>

            )}
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
