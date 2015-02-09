/**
 * Created by kais on 1/16/15.
 */
Template.register.events({

  'click #registerUser': function (e, t) {
    e.preventDefault();
    var user = {
      username: t.find('#username').value,

      password: t.find('#password').value,
      profile: {
        name: t.find('#username').value,
        avatar: null
      }

    };
    $("#registerUser").html('<i class="fa fa-spinner fa-spin"></i>  Registering..')
    Accounts.createUser(user, function (err, res) {
      if (err) {
        console.log(err.reason);
        $("#registerUser").html('Register')
        $("#registerError").css({"visibility":"shown"})

      } else {
        Router.go('/');
        myApp.closeModal();
      }
    });
  }
});
Template.register.helpers({
  error: function () {
    return Session.get('err');
  }
})
