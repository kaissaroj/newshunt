/**
 * Created by kais on 1/26/15.
 */
Template.search.events({
  'click #searchIt': function (e, t) {
    e.preventDefault();
    tag = t.find('#searchtag').value;
    Session.set('tagline', tag);
    //  ss= Meteor.subscribe('searchtag',tag);
  },
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
})
Template.search.helpers({
  searchResult: function () {
    var tag = Session.get('tagline');
    if (!Session.get('tagline')) {
      return null;
    }
    else {
      var sr = Posts.find({'tagline': tag});
      console.log(tag);
      console.log(sr.fetch());
      return sr;

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
})

