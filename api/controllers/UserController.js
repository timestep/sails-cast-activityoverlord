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
        if(err) {
            console.log(err);
            req.session.flash = {
                err: err
            }
        
            return res.redirect('/user/new');
        }

       // res.json(usr);
       // req.session.flash = {};
        res.redirect('/user/show/'+usr.id);
    });
 },

 'show': function(req,res,next){
    User.findOne(req.param('id'), function foundUser(err,usr){
        if(err) return next(err);
        if(!user) return next();
        res.view({
            user: user
        });
    });
 }

};
