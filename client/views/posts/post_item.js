Template.post_item.preserve({
    '.post': function(node) {return node.id}
});

Template.post_item.helpers({
    currentPost: function() {
        return this;
    },
    author: function() {
        return this.date;
    }
});