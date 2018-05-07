import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class MainHeader extends Component {

  onButtonClick (props) {
    props.navigation.navigate('DrawerOpen')
  }

  render() {
    return (
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.onButtonClick(this.props.props)  }}
        centerComponent={{ text: this.props.title, style: { color: '#fff' } }} />
    )
  }
}

export default connect(null, actions)(MainHeader);
