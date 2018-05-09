import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class TrackUrlButton extends Component {

  onButtonClick (){

    const {
      itemToTrack,
      desiredPriceAmazon,
      desiredPriceThirdNew,
      desiredPriceThirdUsed,
      userLocal,
    } = this.props;

    console.log(userLocal);

    this.props.startTrackingButton({
      itemToTrack,
      desiredPriceAmazon,
      desiredPriceThirdNew,
      desiredPriceThirdUsed,
      userLocal,
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
  const { userLocal } = auth;
  const { itemToTrack, desiredPriceAmazon, desiredPriceThirdNew, desiredPriceThirdUsed } = app;
  return { userLocal, itemToTrack, desiredPriceAmazon, desiredPriceThirdNew, desiredPriceThirdUsed };
};

export default connect(mapStateToProps, actions)(TrackUrlButton);
