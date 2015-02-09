/**
 * Created by kais on 1/16/15.
 */


Template.login.helpers({
  error: function () {
    return Session.get('errormsg');
  }
});


Template.login.events({
  'click #signIn': function (e, t) {
    e.preventDefault();

    var username = t.find('#userName').value;
    var password = t.find('#password').value;

    $("#signIn").html('<i class="fa fa-spinner fa-spin"></i> Signing in..')
    Meteor.loginWithPassword(username, password, function (err, tmp) {
      if (!err) {
        Router.go('/');
      }
      else {
        $("#signIn").html('Sign In')
        $("#loginError").css({"visibility":"shown"})
      }
    });
  },
  'click #register': function () {
    renderTemplate(Template.register);
    myApp.popup('.popup-register');
  }

});



