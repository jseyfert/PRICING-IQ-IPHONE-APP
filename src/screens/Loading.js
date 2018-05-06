import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

class Loading extends Component {
    render() {
      // console.log('>>>>>LOADING...LOADING...LOADINGLOADING...LOADING...LOADINGLOADING...LOADING...LOADING<<<<<<');
        return (
            <View style={styles.container}>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
