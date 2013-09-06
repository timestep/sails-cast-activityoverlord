/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var bcrypt = require('bcrypt');

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
 'new': function(req, res){

     //var oldDateObj = new Date();
     //var newDateObj = new Date(oldDateObj.getTime()+60000);
     //req.session.cookie.expires = newDateObj;
     //req.session.authenticated = true;
     //console.log(req.session);
     res.view('session/new');
 },

 'create': function(req,res,next){
    if(!req.param('email') || !req.param('password')) {
        var usernamePasswordRequiredError = [{name: 'usernamePasswordrequired', message: 'You must enter username and passwor'}];
        req.session.flash = {
            err: usernamePasswordRequiredError
        }

        res.redirect('/session/new');
        return;
    }

    User.findOneByEmail(req.param('email')).done(function(err,user){
        if(err) return next(err);

        if(!user){
            var noAccountError = [{ name: 'noAccount', message: 'The Email Address' + req.param('email') + ' not found.'}]
            req.session.flash = {
                err: noAccountError
            }
            res.redirect('/session/new');
            return;
        }
        
        bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
            if(err) return next(err);

            if(!valid){
                var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combo'}]
                req.session.flash = {
                    err:  usernamePasswordMismatchError
                }
                res.redirect('/session/new');
                return;
            }
            
            req.session.authenticated = true;
            req.session.User = user;

            if(req.session.User.admin){
                res.redirect('/user');
                return;
            }

            res.redirect('/user/show/' + user.id);
        });
    });
 }

};
