module.exports = function(req,res,ok){
	console.log("USER POLICY");
	var sessionUserMatchesId = req.session.User.id == req.param('id');
	var isAdmin = req.session.User.admin;
	
	// console.log(req.session.User.id);
	// console.log(req.param('id'));
	// console.log(typeof req.session.User.id);
	// console.log(typeof req.param('id'));
	// console.log(sessionUserMatchesId);
	// console.log(isAdmin);

	if(!(sessionUserMatchesId || isAdmin )) {
		var noRightsError = [{name: 'noRights', message: 'You must be an admin'}];
		req.session.flash = {
			err: noRightsError
		};
		res.redirect('/session/new');
		return;
	}

	ok();
};