// Template.postPage.helpers({
//   currentPost: function() {
//     return Posts.findOne(Session.get('currentPostId'));
//   }
// });
Meteor.methods({
	post: function(postAttributes) {
		var postWithSameLink = Posts.findOne({url: postAttributes.url});	

		// ensure the post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, "Please fill in a headline");

		// check that there are no prevous posts with the same link
		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302, 
				"This link has already been posted",
				postWithSameLink._id);
		}

		console.log("isSimulation", this.isSimulation);
		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url'), {
			title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)')
		});

		Posts.insert(post);
	}
});