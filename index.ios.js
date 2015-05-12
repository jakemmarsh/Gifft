'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component,
  StatusBarIOS,
  AppStateIOS
} = React;
var MainListPage = require('./pages/MainListPage');
var CreatePage = require('./pages/CreatePage');
var {
  getAllOccasions,
  saveOccasion
} = require('./utils/Storage');
var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class GifftApp extends Component {

  constructor(props) {
    super(props);

    // Storage.getAllOccasions().then((occasions) => {
    //   this.state = {occasions}
    // });

    StatusBarIOS.setStyle(0);
  }

  _handleAppStateChange(newAppState) {
    if ( newAppState === 'background' ) {
      console.log('app is backgrounded');
    }
  }

  _handleRightButtonPress() {
    this.props.navigator.push({
      title: 'Save an Occasion',
      component: CreatePage,
      backButtonTitle: 'Upcoming'
    });
  }

  componentWillMount() {
    console.log('will mount');
    // Storage.saveOccasion({
    //   title: 'Mom\'s Birthday',

    // });
  }

  componentDidMount() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    return (
      <NavigatorIOS style={styles.container} initialRoute={{
          title: 'Upcoming Occasions',
          component: MainListPage,
          barTintColor: '#c1ebdd',
          rightButtonTitle: '+',
          onRightButtonPress: this._handleRightButtonPress.bind(this),
          passProps: {
            occasions: [{
              title: 'Mom\'s Birthday',
              reminders: [1, 2, 3],
              giftIdeas: [1, 2],
              date: new Date()
            }]
          }
        }} />
    );
  }

};

AppRegistry.registerComponent('GifftApp', () => GifftApp);
