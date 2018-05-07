import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";

class SubmitScreen extends Component {

    static navigationOptions = { drawerLabel: 'SubmitScreen'};

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>SubmitScreen!</Text>

              <Button
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
                title="hamburger"
              />

            </View>
        );
    }
}


export default SubmitScreen;
