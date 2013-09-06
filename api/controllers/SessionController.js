/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
 'new': function(req, res){

     var oldDateObj = new Date();
     var newDateObj = new Date(oldDateObj.getTime()+60000);
     req.session.cookie.expires = newDateObj;
     req.session.authenticated = true;
     console.log(req.session);
     res.view('session/new');
 }

};
