import Collection from './collections.js';

const Blocker = {};

Blocker.getMappingForBlockedUsers = function (userId) {
    return Collection.find({
        blocker: userId,
    });
};

Blocker.getBlockedUserIds = function (userId) {
    return Blocker.getMappingForBlockedUsers(userId).fetch().map(map => map.blockee);
};

Blocker.getBlockedUsersCount = function (userId) {
    return Blocker.getMappingForBlockedUsers(userId).count();
};

Blocker.checkIfBlocked = function (blockee, blocker) {    
    return !!Collection.findOne({
        blocker: blocker,
        blockee: blockee
    });
};

export default Blocker;
