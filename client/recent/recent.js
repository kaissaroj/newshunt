/**
 * Created by kais on 1/17/15.
 */
Template.recentNewsFeed.helpers({
  posts: function () {
    return Posts.find({}, {sort: {date: -1, time: -1}});
  },
  avatar: function () {
    var x = Meteor.subscribe('avatar', this.creatorId);
    if (x.ready()) {
      var avatar = Meteor.users.findOne({_id: this.creatorId});


      return avatar.profile.avatar;
    }
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
Meteor.subscribe('recentNews');
Template.recentNewsFeed.events({
  'click #comment': function () {
    console.log("hello");


    var all = Posts.findOne(this._id);
    var x = renderTemplate(Template.comment, all);
    console.log(x);
    myApp.popup('.popup-comment');

  },
  'click #vote': function (e, t) {
    e.preventDefault();
    console.log('votes');
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
