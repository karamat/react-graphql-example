import { mongo } from '../mongoService';
import Q from 'q';
import log from "../../shared/consoleLog";
var ObjectID = require('mongodb').ObjectID;

export var getUser = (args) => {
  return mongo()
    .then(db => {
      let deferred = Q.defer();
      log(args);
      let collection = db.collection('Users');
      collection.findOne(args,{name: 1, _id: 1, id: 1}
        ,(err, result) => {
          if (err) {
            deferred.reject(err);
            return;
          }

          db.close();
          log(result);
          deferred.resolve(result);
        });

      return deferred.promise;
    });
  };

export var getStory = (args) => {
  return mongo()
    .then(db => {
      let deferred = Q.defer();

      let collection = db.collection('Stories');
      let _id = new ObjectID(args._id);
      collection.findOne(_id,{text: 1, _id: 1, user_id: 1},
        (err, result) => {
          if (err) {
            deferred.reject(err);
            return;
          }

          db.close();
          deferred.resolve(result);
        });

      return deferred.promise;
    });
  };


export var getStories = (args={}) => {
  return mongo()
    .then(db => {
      let deferred = Q.defer();

      let collection = db.collection('Stories');
      collection.find(args,{text: 1, _id: 1, user_id: 1})
        .toArray( (err, result) => {
          if (err) {
            deferred.reject(err);
            return;
          }

          db.close();
          deferred.resolve(result);
        });

      return deferred.promise;
    });
  };

export var getUsers = (args={}) => {
  return mongo()
    .then(db => {
      let deferred = Q.defer();

      let collection = db.collection('Users');
      collection.find(args,{_id: 1, id: 1, name: 1})
        .toArray( (err, result) => {
          if (err) {
            deferred.reject(err);
            return;
          }

          db.close();
          deferred.resolve(result);
        });

      return deferred.promise;
    });
  };



