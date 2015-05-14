'use strict';

var _ = require('lodash');
var React = require('react-native');
var {
  AsyncStorage
} = React;

module.exports = {

  saveOccasion: function(occasion, cb) {
    cb = cb || function() {};

    console.log('save:', occasion);

    return new Promise((resolve, reject) => {
      this.getNextId().then((id) => {
        AsyncStorage.setItem(id, JSON.stringify(occasion)).then(() => {
          this.getAllOccasions().then(cb).catch(reject);
        }).catch(reject);
      });
    });
  },

  getOccasion: function(id) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(id).then((occasion) => {
        resolve(JSON.parse(occasion));
      }).catch((err) => {
        console.log('error getting occasion:', err);
        reject(err);
      });
    });
  },

  getAllOccasions: function() {
    return new Promise((resolve, reject) => {
      this.getAllKeys().then((keys) => {
        AsyncStorage.multiGet(keys).then((occasions) => {
          resolve(_.map(occasions, (kvPair) => {
            return JSON.parse(kvPair[1]);
          }));
        });
      });
    });
  },

  getAllKeys: function() {
    return AsyncStorage.getAllKeys();
  },

  getNextId: function() {
    var maxId = 1;

    return new Promise((resolve, reject) => {
      this.getAllKeys().then((keys) => {
        keys.forEach((key) => {
          if ( parseInt(key) > maxId ) {
            maxId = parseInt(key);
          }
        });
        resolve((maxId + 1).toString());
      });
    });
  }

};