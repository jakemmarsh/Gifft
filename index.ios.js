'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  StatusBarIOS,
  AppStateIOS
} = React;
var Router = require('react-native-router');
var MainListPage = require('./js/pages/MainListPage');
var CreateOccasionPage = require('./js/pages/CreateOccasionPage');
var AddOccasionButton = require('./js/components/AddOccasionButton');
var Storage = require('./js/utils/Storage');
var constants = require('./js/constants');
var styles = StyleSheet.create({
  header: {
    backgroundColor: constants.colors.teal
  },
  title: {
    color: constants.colors.dark_teal
  },
  container: {
    flex: 1
  }
});

class GifftApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      occasions: []
    };

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
      component: CreateOccasionPage,
      backButtonTitle: 'Upcoming'
    });
  }

  componentWillMount() {
    // Storage.saveOccasion({
    //   title: 'Mom\'s Birthday',
    //   date: new Date()
    // }, (occasions) => {
    //   console.log('occasions after saving:', occasions);
    //   this.setState({ occasions });
    // });
  }

  componentDidMount() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
    Storage.getAllOccasions().then((occasions) => {
      this.setState({
        loading: false,
        occasions: occasions || []
      });
    });
  }

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    return (
      <Router headerStyle={styles.header}
              firstRoute={{
                headerStyle: styles.header,
                name: 'Upcoming Occasions',
                component: MainListPage,
                rightCorner: AddOccasionButton,
                data: {
                  occasions: this.state.occasions
                }
              }} />
    );
  }

};

AppRegistry.registerComponent('GifftApp', () => GifftApp);
