import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ChangeTracking extends Component {

  onButtonClick (){

    console.log('in ChangeTracking');
    // const {
    //   item,
    //   priceAmazon,
    //   priceThirdNew,
    //   priceThirdUsed,
    //   userLocal,
    // } = this.props;
    //
    // console.log(userLocal);
    //
    // this.props.startTrackingButton({
    //   item,
    //   priceAmazon,
    //   priceThirdNew,
    //   priceThirdUsed,
    //   userLocal,
    // });

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
  const { userLocal } = auth;
  const { item, priceAmazon, priceThirdNew, priceThirdUsed } = app;
  return { userLocal, item, priceAmazon, priceThirdNew, priceThirdUsed };
};

export default connect(mapStateToProps, actions)(ChangeTracking);
