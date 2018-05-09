import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class LocalButtonChangeEmail extends Component {

  onClickYes (){
    const { newEmail } = this.props;
    this.props.localChangeEmail({ newEmail });
  }

  onButtonClick (props) {
    AlertIOS.alert(
      'Change Email?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.onClickYes(props),
        },
      ]
    );
  }

  render() {
      return (
            <Button
              onPress={ () => this.onButtonClick(this.props)}
              title='Change Email'
              backgroundColor='#4267B2'
              borderRadius={4} />
      );
  }
}

const mapStateToProps = ({ auth }) => {
  const { newEmail } = auth;
  return { newEmail };
};


export default connect(mapStateToProps, actions)(LocalButtonChangeEmail);
