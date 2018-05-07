import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button as NativeButton } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, localLogin, localSignUp, localPasswordReset } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

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
        <CardSection>
          <Spinner size="large" />;
        </CardSection>
      )
    }

    if (this.state.button === 'signin'){
      return (
        <View>
          <CardSection>
            <Button onPress={this.onLogin.bind(this)}>
              Sign In
            </Button>
          </CardSection>
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
          <CardSection>
            <Button onPress={this.onPasswordReset.bind(this)}>
              Forgot Password
            </Button>
          </CardSection>
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
        <CardSection>
          <Button onPress={this.onSignUp.bind(this)}>
            Create Account
          </Button>
        </CardSection>
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
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        { this.state.button === 'forgotPassword' || <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>}


        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

          {this.renderButton()}


      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
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
