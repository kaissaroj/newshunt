/**
 * Created by kais on 1/26/15.
 */

Template.notPost.helpers({
  Result: function () {
    var postid = Session.get('pooo');

    var xx = Posts.find({'_id': postid});
    console.log(postid);
    return xx;

  },
  Image: function () {
    Meteor.subscribe('imgbut');
    var pp = Posts.findOne({uploadImage: this.uploadImage});
    if (pp.uploadImage == null) {
      console.log('image null');
    }
    else
      return pp;


  }
});
Template.notPost.events({
  'click #comment': function () {
    //console.log("hello");

    var postid = this._id;

    Session.set("creatorId", this.posterId);

    var x = renderTemplate(Template.comment, {creatorId: this.posterId});
    //console.log(x);
    myApp.popup('.popup-comment');
    Session.set("clickpostId", postid);


  },
  'click #vote': function (e, t) {
    e.preventDefault();
    //console.log('votes');
    Meteor.call('upvote', this._id);

  },
  'click #viewImage': function (e, t) {
    e.preventDefault();
    var mainView = myApp.addView('.view-main', {
      dynamicNavbar: true
    });
    var myPhotoBrowserStandalone = myApp.photoBrowser({
      photos: [
        this.uploadImage
      ]

    });
    myPhotoBrowserStandalone.open();

  },
  'click #share': function (e, t) {
    e.preventDefault();
    renderTemplate(Template.share);
    myApp.popup('.popup-share');
  }
});
