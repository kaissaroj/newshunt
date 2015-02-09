/**
 * Created by kais on 1/16/15.
 */


Meteor.publish('postsNews',function(){
  return Posts.find();
});
Meteor.publish('newsid',function(){
  return Posts.find({},{fields:{'creatorId':1}});
});
Meteor.publish('postComment',function(){
   return Posts.find({},{fields:{'by':1},fields:{'message':1}});
});
Meteor.publish('avatar',function(crator){
  return Meteor.users.find({_id:crator},{fields:{'profile.avatar':1}});
});
Meteor.publish('notiPost',function(notiPost){
  return Meteor.users.find({_id:notiPost});
});
Meteor.publish('searchtag',function(tag){
  var ss = Posts.find({'tagline':tag});
  //console.log(ss.fetch());
  return ss;
});

Meteor.publish('imgbut',function(){
  var ss = Posts.find({},{fields:{'uploadImage':1}});

  return ss;
});
Meteor.publish('editpost',function(postid){
  var ss = Posts.find({_id:postid});
 // console.log(ss.fetch());
  return ss;
});
Meteor.publish('myPosts',function(){
  var my= Posts.find({creatorId:this.userId});
  return my;
});


Meteor.publish('notifyComment',function(){
  var ui=  Notifications.find({creatorId:this.userId});

  return ui;
});

Meteor.methods({

  'insertNews': function (user)
  {
    var currentUserId = Meteor.user().username;
    var lagLng = user.latLng;
    var lat = lagLng.lat;
    var lng = lagLng.lng;
    Posts.insert({
      title: user.news,
      upvoter:user.upvoter,
      votes:user.votes,
      comments:[],
      commentsCount:0,
      date:user.date,
      username:currentUserId,
      parent:user.parent,
      creatorId:user.posterId,
      avatar:user.avatar,
      uploadImage:user.uploadImage,
      tagline:user.tagline,


      markers:{
        lat: lat,
        lng: lng


      }

    });

  },

  'upvote':function(postId)
  {
    var user= Meteor.user();
    var post = Posts.findOne(postId);
    if (_.include(post.upvoter, user._id))
    {
      throw new Meteor.Error(422, 'Already upvoted this post');
    }
    Posts.update(post._id,{
      $addToSet: { upvoter: user._id},
      $inc: {votes: 1}
    });


  },
  'insertComments':function(id,x){


    Posts.update({_id:id}, {$inc: {commentsCount: 1}});
    return Posts.update({_id:id},{$set:{comments:x}});

  },
  'insertNot':function(notCol){

    if(notCol.creatorId == Meteor.userId()) {


      return;
    }

    var x= Notifications.insert({
      commentedBy :notCol.by,
      postId:notCol.postId,
      commentorId:notCol.byId,
      read:false,
      creatorId:notCol.creatorId,
      message:notCol.message

    });

    //  console.log(x);

  },
  'updateImage':function(dataUrl){
     Meteor.users.update({_id:this.userId}, {$set:{'profile.avatar':dataUrl}});

  },
  'editPost':function(userid,title,tagline){
   return Posts.update({_id:userid}, {$set:{'title':title}},{$set:{'tagline':tagline}});
  },
  'deletePost':function(userid){
    return Posts.remove({_id:userid});
  }


});
