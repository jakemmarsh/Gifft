'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Component
} = React;
var constants = require('../constants');
var styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    borderRadius: 3,
    padding: 5,
    backgroundColor: constants.colors.orange
  },
  icon: {
    color: constants.colors.white,
    fontWeight: 'bold'
  }
});

class AddOccasionButton extends Component {

  constructor(props) {
    console.log('props:', props);
    super(props);
  }

  render() {
    return (
      <View style={styles.button}>
        <Text style={styles.icon}>+</Text>
      </View>
    );
  }

}

module.exports = AddOccasionButton;