import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ChangeTrackingButton extends Component {

  onButtonClick (){

    console.log('in ChangeTrackingButton');
    const {
      url,
      asin,
      priceAmazon,
      priceThirdNew,
      priceThirdUsed,
      pushNotification,
      emailNotification,
      user,
    } = this.props;

    this.props.changeTrackingButton({
      url,
      asin,
      priceAmazon,
      priceThirdNew,
      priceThirdUsed,
      pushNotification,
      emailNotification,
      user,
    });

  }

  render() {
      return (
        <Button
          onPress={ () => this.onButtonClick(this.props)}
          icon={{name: 'pencil', type: 'font-awesome'}}
          title='Change Item'
          backgroundColor='#4267B2'
          borderRadius={4} />
      );
  }
}

const mapStateToProps = ({ app, auth }) => {
  const { user } = auth;
  const { url, asin, priceAmazon, priceThirdNew, priceThirdUsed, pushNotification, emailNotification } = app;
  return { url, asin, priceAmazon, priceThirdNew, priceThirdUsed, pushNotification, emailNotification, user };
};

export default connect(mapStateToProps, actions)(ChangeTrackingButton);
