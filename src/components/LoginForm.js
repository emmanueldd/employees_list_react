import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress}>
        Login
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email" placeholder="email@gmail.com"
            onChangeText={this.onEmailChanged}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry label="Password" placeholder="Password"
            onChangeText={this.onPasswordChanged}
            value={this.props.password}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const { email, password, error, loading } = state.auth;
  return { email, password, error, loading };
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser })(LoginForm); // Gives access to this.props.emailChanged
