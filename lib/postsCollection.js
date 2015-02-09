/**
 * Created by kais on 1/16/15.
 */
Posts = new Meteor.Collection('posts');
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: function(creatorId, doc, fieldNames) {
    return ownsDocument(creatorId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});
