/**
 * UserController
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
 'new': function(req,res){
    res.view();
 },

 'create': function(req, res, next) {
    User.create( req.params.all(), function userCreated( err, usr ){
        if(err) return next(err);

        res.json(usr);
    });
 }

};
