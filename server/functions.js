import pull from "lodash.pull";
import pullAll from "lodash.pullall";
import Collection from '../lib/collections.js';

const Blocker = {};

Blocker.blockUser = function(blockee, blocker) {

  // If the user tried to block himself, do nothing
  if (blocker === blockee) {
    return false;
  }

  // Generates the document to insert
  const blockerDoc = {
      blocker: blocker,
      blockee: blockee
  }

  return Collection.upsert(blockerDoc, {
    $setOnInsert: blockerDoc
  });
};

Blocker.unblockUser = function(blockee, blocker) {
    return Collection.remove({
        blocker: blocker,
        blockee: blockee
    });
};

//////////////
// INTERNAL //
//////////////

Blocker.getMappingOfUsersBlockingAUser = function(userId) {
    return Collection.find({
        blockee: userId,
    });
};

Blocker.getUsersBlockingAUserCount = function(userId) {
    return Blocker.getMappingOfUsersBlockingAUser(userId).count();
};

Blocker.getUserIdsOfUsersBlockingAUser = function(userId) {    
    return getMappingOfUsersBlockingAUser(userId).fetch().map(b => b.blocker);
};

Blocker.getUsersBlockingAUser = function (userId) {
  return Meteor.users.find({
    _id: {
      $in: Blocker.getUserIdsOfUsersBlockingAUser,
    }
  })
};

Blocker.filterBlockedUsers = function(users, userId) {

  // Find all users the user blocked,
  // And all the users who have blocked the user
  const blockerMapping = Collection.find({
      $or: [{
          blocker: userId
      }, {
          blockee: userId
      }]
  }).fetch();

  // Extract all the user ids, as an array of array
  const nestedUserIdArray = blockerMapping.map(m => [m.blocker, m.blockee]);

  // Flatten the array
  const flattenedUserIdArray = [].concat.apply([], nestedUserIdArray);

  // Ensures all userIds are unique
  const uniqueUserIdArray = [...new Set(flattenedUserIdArray)]

  // And remove the user's own id
  const blockedUsers = pull(uniqueUserIdArray, userId);

  // Returns the list of `users`
  // Minus all the blocked Users
  return pullAll(users, blockedUsers);
};

export default Blocker;
