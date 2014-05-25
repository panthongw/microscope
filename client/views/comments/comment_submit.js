Template.commentSubmit.events({
  'submit form': function(e, t) {
    e.preventDefault();

    var comment = {
      body: $(e.target).find('[name=body]').val(),
      postId: t.data._id
    };

    Meteor.call('comment', comment, function(error, commentId) {
      error && throwError(error.reason);
    });
  }
});
