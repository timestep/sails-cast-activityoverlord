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
 'index': function(req,res,next){
     console.log(new Date());
     console.log(req.session.authenticated);
     console.log(res.isJson);
     console.log(res.isAjax);

     User.find(function foundUsers(err,users){
        if(err) return next(err);
        else { res.view({  users: users }); }
        // else { res.json(users)}
    });
 },

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

        req.session.authenticated = true;
        req.session.User = usr;
       // res.json(usr);
       // req.session.flash = {};
        res.redirect('/user/show/'+usr.id);
    });
 },

 'show': function(req,res,next){
    User.findOne(req.param('id'), function foundUser(err,usr){
        if(err) return next(err);
        if(!usr) return next();
        res.json(usr);
    });
 },

 'edit':function(req,res,next){
    User.findOne(req.param('id'), function foundUser(err,user){
        if(err) return next(err);
        if(!user) return next();

        res.view({
            user: user
        });
    });
 },

 'update': function(req,res,next){
     User.update(req.param('id'), req.params.all(), function userUpdated(err){
         if(err) {
             return res.redirect('/user/edit/'+ req.param('id'));
         }
         res.redirect('/user/show/' + req.param('id'));
     });
 },

 'destroy': function(req,res,next){
    User.findOne(req.param('id'), function foundUser(err,user){
        if(err) return next(err);
        if(!user) return next('User doesnt exsit');

        User.destroy(req.param('id'), function userDestroyed(err){
            if(err) return next(err);
        });
        
        res.redirect('/user');

    });
 },

 'subscribe': function(req,res,next){
    User.find(function foundUser(err,users){
        if(err){console.log(err)}
        User.subscribe(req.socket);
        User.subscribe(req.socket, users) 
    });
    
 }
};
