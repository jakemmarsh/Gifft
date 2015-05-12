'use strict';

var React = require('react-native');
var {
  AsyncStorage
} = React;

exports.saveOccasion = function(occasion) {
  console.log('save:', occasion);
  return new Promise((resolve, reject) => {
    this.getNextId().then((id) => {
      AsyncStorage.setItem(id, JSON.stringify(occasion)).then(resolve).catch(reject);
    });
  });
}

exports.getOccasion = function(id) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(id).then((occasion) => {
      resolve(JSON.parse(occasion));
    }).catch((err) => {
      console.log('error getting occasion:', err);
      reject(err);
    });
  });
}

exports.getAllOccasions = function() {
  return new Promise((resolve, reject) => {
    this.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((occasions) => {
        resolve(occasions || []);
      });
    });
  });
}

exports.getAllKeys = function() {
  return AsyncStorage.getAllKeys();
}

exports.getNextId = function() {
  let maxId = 1;

  return new Promise((resolve, reject) => {
    this.getAllKeys().then((keys) => {
      keys.forEach((key) => {
        if ( key > maxId ) {
          maxId = key;
        }
      });
      resolve(maxId);
    });
  });
}