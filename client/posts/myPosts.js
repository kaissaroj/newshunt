/**
 * Created by kais on 1/24/15.
 */
Template.myPosts.helpers({
  myPosts: function () {

    var sub = Meteor.subscribe('myPosts');
    if (sub.ready) {
      var x = Posts.find({'creatorId': Meteor.userId()});

      console.log(x.fetch());
      return x;
    }
  }
});
Template.myPosts.events({
  'click #editPost': function (e, t) {
    e.preventDefault();
    var postid = this._id;
    // console.log(postid);
    Meteor.subscribe('editpost', postid);
    var editpostItem = Posts.findOne({_id: this._id});

    renderTemplate(Template.editPost, editpostItem);
    myApp.popup('.popup-editPost');

  },
  'click #deletePost': function (e, t) {
    e.preventDefault();
    var postid = this._id;
    Meteor.call('deletePost', postid);
  }
})
