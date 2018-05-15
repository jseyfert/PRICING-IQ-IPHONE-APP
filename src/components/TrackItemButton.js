import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class TrackItemButton extends Component {

  onButtonClick (){

    const {
      item_u,
      priceAmazon_u,
      priceThirdNew_u,
      priceThirdUsed_u,
      user,
    } = this.props;

    this.props.startTrackingButton({
      item_u,
      priceAmazon_u,
      priceThirdNew_u,
      priceThirdUsed_u,
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
  const { item_u, priceAmazon_u, priceThirdNew_u, priceThirdUsed_u } = app;
  return { item_u, priceAmazon_u, priceThirdNew_u, priceThirdUsed_u, user };
};

export default connect(mapStateToProps, actions)(TrackItemButton);
