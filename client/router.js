Router.configure({
	layoutTemplate: 'masterLayout'
});

Router.map(function(){
  this.route('postsList', {path: '/'});
  
  this.route('postPage', {
  	path: '/posts/:_id',
  	data: function() { 
  		Session.set('currentPostId', this.params._id);
  		return Posts.findOne(this.params._id);
  	}
  });

  this.route('postSubmit', {
  	path: '/submit',
  	controller: 'PostCreateController'
  });

  this.route('postEdit', {
  	path: 'posts/:_id/edit',
  	// data: function() { 
  	// 	Session.set('currentPostId', this.params._id);
  	// 	return { 
  	// 		currentPost: Posts.findOne(this.params._id),
  	// 		comments: Comments.find({postId: this.params._id})
  	// 	}
  	// }
  });
});


PostCreateController = RouteController.extend({

	onBeforeAction: function(pause) {
		if (!Meteor.user()) {
			this.render('accessDenied');

			pause();
		}		
	},

	action: function() {
		if (this.ready())
			this.render();
		else 
			this.render('loading');
	}
});