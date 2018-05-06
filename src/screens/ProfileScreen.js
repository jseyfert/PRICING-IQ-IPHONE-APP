import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { Button } from "react-native-elements";
import { connect } from 'react-redux';

import * as actions from '../actions';
import FacebookButtonLogout from '../components/FacebookButtonLogout'
import LocalButtonLogout from '../components/LocalButtonLogout'
import GoogleButtonLogout from '../components/GoogleButtonLogout'

class ProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
      title: 'Profile',
      // headerRight: (
      //   <Button
      //     title='Settings'
      //     backgroundColor='rgba(0,0,0,0)'
      //     color='rgba(0, 122, 255, 1)'
      //     onPress={() => navigation.navigate('settings')}
      //   />
      // )
    });


    render() {
      // console.log('this.props.userLocal=====>>',this.props.userLocal);
      // console.log('this.props.userFacebook=====>>',this.props.userFacebook);
      // console.log('this.props.userGoogle=====>>',this.props.userGoogle);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

              { !this.props.userLocal || <View style={styles.containerOauthButtons}>
                <LocalButtonLogout props={this.props}/>
              </View>}

              { !this.props.userFacebook || <View style={styles.containerOauthButtons}>
                <FacebookButtonLogout props={this.props}/>
              </View>}

              { !this.props.userGoogle || <View style={styles.containerOauthButtons}>
                <GoogleButtonLogout props={this.props}/>
              </View>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
  containerLocalLogin: {
    flex: 1,
  },
  containerLocalLogin: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerOauth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOauthButtons: {
    marginBottom: 10,
  },
});

const mapStateToProps = ({ auth }) => {
  const { userLoggedIn, userFacebook, userGoogle, userLocal } = auth;
  return { userLoggedIn, userFacebook, userGoogle, userLocal };
};

export default connect(mapStateToProps, actions)(ProfileScreen);
