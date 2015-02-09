/**
 * Created by kais on 1/16/15.
 */

Template.profile.events({
  'click #logout': function () {
    $("#logout").html('<i class="fa fa-spinner fa-spin"></i> Loging Out...')
    Meteor.logout();
    Router.go('/');
  },
  'change #fileInput': function (e, t) {
    if (Meteor.isCordova) {
      navigator.camera.getPicture(function (result) {
          console.log(result);
        }, function (err) {

        }, {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBARY
        }
      );
    }
    else {
      var reader = new FileReader();

      reader.onload = function (e) {
        var dataURL = reader.result;
        $("#profileImage").attr("src",reader.result );
        Meteor.call('updateImage', dataURL, function (err, res) {
          if (!err)
            console.log('sucess');
          else
            console.log(err);
        });
      }

      reader.readAsDataURL(e.target.files[0]);

    }
  },
  'click #myPosts': function () {
    var x = renderTemplate(Template.myPosts);
    myApp.popup('.popup-myPosts');

  },
  'click #myPic': function () {
    $("#fileInput").click();
  }
});
Template.profile.helpers({
  username: function () {
    return Meteor.user() && Meteor.user().username;
  },
  photo: function () {
    return Meteor.user().profile.avatar;
  }

});
