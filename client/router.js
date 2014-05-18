Router.configure({
	layoutTemplate: 'masterLayout'
});

Router.map(function(){
  this.route('postsList', {path: '/'});
  
  this.route('postPage', {
  	path: '/posts/:_id',
  	data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', {
  	path: '/submit',
  	controller: 'PostCreateController'
  });
});


PostCreateController = RouteController.extend({

	onBeforeAction: function() {
		console.log("Before Action", Meteor.user());
		if (Meteor.user()===null) {
			this.render('accessDenied');

			pause();
		}
			
	}
});