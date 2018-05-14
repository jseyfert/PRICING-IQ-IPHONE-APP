import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class TrackItemButton extends Component {

  onButtonClick (){

    const {
      item,
      priceAmazon,
      priceThirdNew,
      priceThirdUsed,
      user,
    } = this.props;

    this.props.startTrackingButton({
      item,
      priceAmazon,
      priceThirdNew,
      priceThirdUsed,
      user,
    });

  }

  render() {
      return (
        <Button
          onPress={ () => this.onButtonClick(this.props)}
          title='Start Tracking'
          backgroundColor='#4267B2'
          borderRadius={4} />
      );
  }
}

const mapStateToProps = ({ app, auth }) => {
  const { user } = auth;
  const { item, priceAmazon, priceThirdNew, priceThirdUsed } = app;
  return { item, priceAmazon, priceThirdNew, priceThirdUsed, user };
};

export default connect(mapStateToProps, actions)(TrackItemButton);
