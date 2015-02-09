/**
 * Created by kais on 1/16/15.
 */
Template.commenthere.events({
  'click #sendComment': function (e, t) {
    e.preventDefault();
    //console.log(this);
    var x = this.comments || [];
    var CommentorId = Meteor.userId();
    //console.log(CommentorId);
    var cmnt = {
      by: Meteor.user().username,
      message: t.find('#message').value,
      byId: CommentorId,
      postId: Session.get("clickpostId"),
      creatorId: this.creatorId

    };
    // console.log(Session.get('creatorId'));
    x.push(cmnt);


    //createCommentNotification(cmnt);
    Meteor.call('insertComments', Session.get("clickpostId"), x, function (err, res) {
      if (!err)
        Meteor.call('insertNot', cmnt);
      else
        console.log(err);
    });

    t.find('#message').value = "";
  }
});




