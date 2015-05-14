'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight
} = React;
var RemindersListPage = require('./RemindersListPage');
var GiftIdeasListPage = require('./GiftIdeasListPage');
var constants = require('../constants');
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.background_grey,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class OccasionPage extends Component {

  constructor(props) {
    super(props);
    this.state = { occasion: props.data.occasion };
  }

  navigateToReminders() {
    this.props.toRoute({
      name: 'Reminders',
      component: RemindersListPage,
      data: { occasion: this.state.occasion }
    });
  }

  navigateToGiftIdeas() {
    this.props.toRoute({
      name: 'Gift Ideas',
      component: GiftIdeasListPage,
      data: { occasion: this.state.occasion }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.occasion.title}
        </Text>
        <TouchableHighlight underlayColor={constants.colors.dark_grey} onPress={this.navigateToReminders.bind(this)}>
          <Text style={styles.instructions}>
            Reminders
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={constants.colors.dark_grey} onPress={this.navigateToGiftIdeas.bind(this)}>
          <Text style={styles.instructions}>
            Gift Ideas
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

}

module.exports = OccasionPage;