import { Meteor } from 'meteor/meteor';
import Blocker from '../lib/functions.js';

// Publish the mapping information and users of this user's followers
Meteor.publish('brewhk:accounts-block/mappingOfUsersBlocked', function () {
  return Blocker.getMappingForBlockedUsers(this.userId);
});
