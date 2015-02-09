/**
 * Created by kais on 1/26/15.
 */
Template.editPost.rendered = function () {
  editpost = this.data;
  // console.log(editpost.fetch());

}

Template.editPost.events({
  'click #editNews': function (e, t) {
    e.preventDefault();

    var title = t.find('#description').value;
    var tagline = t.find('#tag').value;
    var userid = this._id;
    console.log(userid);
    Meteor.call('editPost', userid, title, tagline, function (err, res) {
      if (err)
        console.log(err);
      else
        console.log(res);
    })
  }
});
