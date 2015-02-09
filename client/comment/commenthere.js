/**
 * Created by kais on 1/18/15.
 */

Template.commenthere.helpers({
  commentshere: function () {
    var subs = Meteor.subscribe("postComment");


    if (subs.ready()) {
      var xxx = Posts.find({_id: Session.get("clickpostId")});

      // console.log(xxx.fetch());
      return xxx;
    }


  }
});
