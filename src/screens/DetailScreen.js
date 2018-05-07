import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";

class DetailScreen extends Component {

    static navigationOptions = { drawerLabel: 'DetailScreen'};

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>DetailScreen!</Text>

              <Button
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
                title="hamburger"
              />

            </View>
        );
    }
}


export default DetailScreen;
