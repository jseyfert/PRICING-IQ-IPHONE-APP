import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button as NativeButton } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, localLogin, localSignUp, localPasswordReset } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';

import { Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button as ElementsButton } from 'react-native-elements'



class LoginForm extends Component {

  state = { button: 'signin' }

  onChangeButton(option) {
    this.setState({button: option})
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLogin() {
    const { email, password } = this.props;
    this.props.localLogin({ email, password });
  }

  onSignUp() {
    const { email, password } = this.props;
    this.props.localSignUp({ email, password });
  }

  onPasswordReset() {
    const { email } = this.props;
    this.props.localPasswordReset({ email });
    this.setState({button: 'signin'})
  }

  renderButton() {
    if (this.props.buttonLoading) {
      return (
        <ElementsButton
          loading
          backgroundColor='#CF543D'
          borderRadius={4}
        />
      )
    }

    if (this.state.button === 'signin'){
      return (
        <View>
          <ElementsButton
            onPress={this.onSignUp.bind(this)}
            icon={{name: 'sign-in', type: 'font-awesome'}}
            title='Sign In'
            backgroundColor='#CF543D'
            borderRadius={4}
          />
          <Text style={styles.textStyle}>
            <NativeButton
              onPress={this.onChangeButton.bind(this, 'signup')}
              title="Create Account" />
            <NativeButton
              onPress={this.onChangeButton.bind(this, 'forgotPassword')}
              title="Forgot Password?"/>
          </Text>
        </View>
        );
    }

    if (this.state.button === 'forgotPassword'){
      return (
        <View>
          <ElementsButton
            onPress={this.onSignUp.bind(this)}
            icon={{name: 'info-circle', type: 'font-awesome'}}
            title='Forgot Password'
            backgroundColor='#CF543D'
            borderRadius={4}
          />
          <Text style={styles.textStyle}>
            <NativeButton
              onPress={this.onChangeButton.bind(this, 'signin')}
              title="Back to Sign In" />
          </Text>
        </View>
        );
    }

    return (
      <View>
          <ElementsButton
            onPress={this.onSignUp.bind(this)}
            icon={{name: 'sign-in', type: 'font-awesome'}}
            title='Create Account'
            backgroundColor='#CF543D'
            borderRadius={4}
          />
        <Text style={styles.textStyle}>
          <NativeButton
            onPress={this.onChangeButton.bind(this, 'signin')}
            title="Back to Sign In" />
        </Text>
      </View>
      );
  }

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder="email@gmail.com"
          onChangeText={this.onEmailChange.bind(this)}
          // value={this.props.email}
        />

        { this.state.button === 'forgotPassword' || <View>
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          // value={this.props.password}
        /></View>}

        <FormValidationMessage labelStyle={{ textAlign: 'center', fontSize: 18 }}>{this.props.error}</FormValidationMessage>

          {this.renderButton()}

      </View>
    );
  }
}

const styles = {
  // errorTextStyle: {4
  //   fontSize: 20,
  //   alignSelf: 'center',
  //   color: 'red'
  // },
  textStyle: {
    // padding: 8,
    // fontSize: 18,
    alignSelf: 'center',
  }
};

const mapStateToProps = ({ auth }) => {
  // console.log('in loginForm  STATE=====', auth);
  const { email, password, error, buttonLoading } = auth;

  return { email, password, error, buttonLoading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, localLogin, localSignUp, localPasswordReset
})(LoginForm);
