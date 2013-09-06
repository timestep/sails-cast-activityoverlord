$(document).ready(function(){
    $('.form-signin').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 6,
                required:true
            },
            confirmation: {
                minlength: 6,
                equalTo: "#password"
            }
        },
        success: function(elm){
            elm.text('OK!').addclass('valid')
        }
    });
});
