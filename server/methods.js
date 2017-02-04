import { Meteor } from 'meteor/meteor';
import Blocker from './functions.js';

Meteor.methods({
	'brewhk:accounts-block/block': function (blockee) {
		return Blocker.blockUser(blockee, this.userId);
	},
	'brewhk:accounts-block/unblock': function (blockee) {
		return Blocker.unblockUser(blockee, this.userId);
	},
});
