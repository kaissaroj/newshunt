
Router.route('/',function(){
  if(Meteor.userId()){
    this.layout('layout');
  }
  else
  this.layout('login');
});

