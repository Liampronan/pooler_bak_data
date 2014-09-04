//TODO: this probs should be local

var saveUberData = function (uberData){
  var objectrocket = require('objectrocket');
  var  options = {
    "api_key" : "886823e2833549ff8abe2e659e1604e7",
    "document" : uberData,
    "db" : "pooler",
    "collection" : "Uber"
  }

  objectrocket.add(JSON.stringify(options), function(error, result) {
    // Your code goes here based on error or success.
    console.log("ERROR");console.log(error);
    console.log("SUCCESS DB");console.log(result);
  });
}

module.exports.saveUberData = saveUberData;


//var Server = require('mongodb').Server;
//var Db = require('mongodb').Db;
//
//new Db('users',
//    new Server("2b99581c579d192b4b78c4a879b6e2e1/dfw-c9-1.objectrocket.com:37024,dfw-c9-0.objectrocket.com:37024/pooler", 27017, {auto_reconnect:true}), {safe:true}).open(function(err, db) {
//      if (err) throw err;
//
//      db.authenticate('localhost', '123123', function(autherr, result) {
//        if (autherr) throw autherr;
//
//        db.collection('accounts', function(colerr, collection) {
//          if (colerr) throw colerr;
//
//          // Define a simple JSON document
//          var doc = {'login': 'bob', 'password': 'secret'}
//
//          // Insert our document
//          collection.insert(doc, {}, function(){});
//
//          // Change our password
//          collection.update({'login': 'bob'},
//              {'$set': {'password': 'notsosecret'}},
//              function(){});
//
//          // Retrieve our document
//          collection.findOne({}, function(finderr, docs) {
//            if (finderr) {
//              console.log(finderr);
//            } else {
//              return console.log(docs);
//            };
//          });
//
//        });
//
//      });
//
//    });