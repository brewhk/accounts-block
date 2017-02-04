import { Meteor } from 'meteor/meteor';

const Blocker = {};

Blocker.blockUser = function (blockee, cb) {
	Meteor.call('brewhk:accounts-block/block', blockee, cb);
}

Blocker.unblockUser = function (blockee, cb) {
	Meteor.call('brewhk:accounts-block/unblock', blockee, cb);
}

export default Blocker;