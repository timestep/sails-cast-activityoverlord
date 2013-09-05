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
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
 },

 'create': function(req, res, next) {
    User.create( req.params.all(), function userCreated( err, usr ){
        if(err) {
            console.log(err);
            req.session.flash = {
                err: err
            }
        
            return res.redirect('/user/new');
        }

        res.json(usr);
        req.session.flash = {};
    });
 }

};
