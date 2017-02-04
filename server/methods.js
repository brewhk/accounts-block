import { Meteor } from 'meteor/meteor';
import Blocker from './functions.js';
import BlockerLib from '../lib/functions.js';

Meteor.methods({
	'brewhk:accounts-block/block': function (blockee) {
		return Blocker.blockUser(blockee, this.userId);
	},
	'brewhk:accounts-block/unblock': function (blockee) {
		return Blocker.unblockUser(blockee, this.userId);
	},
	'brewhk:accounts-block/getBlockedUsers': function () {
		return Meteor.users.find({
      _id: {
        $in: BlockerLib.getBlockedUserIds(this.userId),
      }
    }, {
      fields: {
        username: 1,
        'profile.firstName': 1,
        'profile.lastName': 1,
        'settings.profile.firstName': 1,
        'settings.profile.lastName': 1,
        'settings.account.firstName': 1,
        'settings.account.lastName': 1,
      }
    }).fetch();
	},
});
