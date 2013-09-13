module.exports = function(req,res,next){
	console.log("FLASH POLICY");
    res.locals.flash = {};
    if(!req.session.flash) return next();
    res.locals.flash = _.clone(req.session.flash);
    //clears flash
    req.session.flash = {};
    next();
};
