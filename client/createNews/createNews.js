/**
 * Created by kais on 1/16/15.
 */
Tracker.autorun(function () {
  var latLng = Geolocation.latLng();
  Session.set("latLng", latLng);
  console.log(latLng);
});

Template.createNews.events({
  'click #sendNews': function (e, t) {
    e.preventDefault();
    var latLng = Session.get("latLng");
    console.log(latLng);
    upp = Session.get('uploadedImage');

    console.log(upp);
    if (latLng != null && t.find("#description").value.trim().length > 0) {
      var user = {
        news: t.find('#description').value.trim(),
        upvoter: [],
        votes: 0,
        comments: [],
        date: new Date(),
        commentedAt: null,
        posterId: Meteor.userId(),
        latLng: latLng,
        uploadImage: upp,
        tagline: t.find('#tag').value
      }
    }

    else {
      alert("Cannot post!");
    }

    Meteor.call('insertNews', user, function (err) {
      if (!err) {

      }
      $("#removephoto").click();
    });
    t.find('#description').value = "";
    Session.set('uploadedImage', null);
    $("#imageSelect").attr({"src": ""});

  },
  'change #filInput': function (e, t) {
    e.preventDefault();

    fileExtension = $("#filInput").val().toString().toLowerCase().split('.').pop();
    validExtensions = ['jpg', 'gif', 'png', 'jpeg', 'webm'];

    if (fileExtension && validExtensions.indexOf(fileExtension) < 0) {
      alert("Invalid image");
      return;
    }

    var reader = new FileReader();
    //alert('img');
    reader.onload = function (e) {
      dataURL = reader.result;
      //console.log(dataURL);
      Session.set('uploadedImage', dataURL);
      $(imageSelect).attr("src", reader.result);
      $(imageSelect).attr("style", "display:inline");

      if (dataURL.length > 0) {
        $("#clickgallery").hide();
        $("#removephoto").slideDown();
      }
      $("#filInput").val(null);
    }

    reader.readAsDataURL(e.target.files[0]);
  },
  'click #clickgallery': function () {
    $("#filInput").click();
  },
  'click #removephoto': function () {
    $("#removephoto").hide();
    Session.set('uploadedImage', null);
    $(imageSelect).attr("src", "");
    //$(imageSelect).attr("style", "display: none");
    $("#clickgallery").slideDown();
  }
});
