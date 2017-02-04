# `brewhk:accounts-block`

## Overview

Keeps a mapping of which users blocked who, and provides methods to filter out blocked users.

Both client and server exposes a single `Blocker` object, which includes methods specific to each environment.

You can import the `Blocker` object using:

    import Blocker from 'meteor/brewhk:accounts-block';

## Client-side methods

**N.B.** Client-side methods only work when the appropriate subscription has been made.

#### `Blocker.blockUser`

Makes a call to the server to block a user.

###### Arguments

* `blockee*` *String* - The `_id` of the user to be blocked
* `cb` *Function* - A callback, passed with two arguments - `error` and `response`

###### Return Value

None

#### `Blocker.unblockUser`

Makes a call to the server to unblock a user.

###### Arguments

* `blockee*` *String* - The `_id` of the user to be unblocked
* `cb` *Function* - A callback, passed with two arguments - `error` and `response`

###### Return Value

None

## Shared methods

**N.B.** Client-side methods only work when the appropriate subscription has been made.

#### `Blocker.getMappingForBlockedUsers`

Gets a cursor to the account block mapping for the user. Reading the actual code here might be more informative.

    Blocker.getMappingForBlockedUsers = function (userId) {
        return Collection.find({
            blocker: userId,
        });
    };

For example, this method was used in our publications.

###### Arguments

* `userId*` *String* - The `_id` of the user to retrieve mapping for

###### Return Value

* `cursor` *Cursor* - a cursor to the account block mapping for the user

#### `Blocker.getBlockedUserIds`

Get an array of `id`s belonging to users who have been blocked by the user specified.

For example, to see a list of users blocked by the user with `_id` `8qb2e86qqw`, you would run `Blocker.getBlockedUserIds('8qb2e86qqw')`

###### Arguments

* `userId*` *String* - The user specified

###### Return Value

* `userIds` *[String]* - a list of `_id`s of users that was blocked

#### `Blocker.getBlockedUsersCount`

Get the number of users who have been blocked by the user specified.

###### Arguments

* `userId*` *String* - The user specified

###### Return Value

* `count` *Number* - the number of users who have been blocked by the user specified

#### `Blocker.checkIfBlocked`

Check whether a user has blocked another user

###### Arguments

* `blockee*` *String* - The user that would be blocked
* `blocker*` *String* - The user that is blocking the blockee

###### Return Value

* `isBlocked` *Boolean* - Whether the blocking relationship exists or not

## Server-side functions

#### `Blocker.blockUser`

Blocks a user.

###### Arguments

* `blockee*` *String* - The `_id` of the user to be blocked
* `blocker*` *String* - The `_id` of the user blocking the blockee

###### Return Value

* `res` *Object* - Object containing the keys `numberAffected` and `insertedId`

#### `Blocker.unblockUser`

Unblocks a user.

###### Arguments

* `blockee*` *String* - The `_id` of the user being blocked
* `blocker*` *String* - The `_id` of the user blocking the blockee

###### Return Value

* `count` *Number* - The number of documents affected. Should be equal to `1`

#### `Blocker.filterBlockedUsers`

Filters a list of users' `id`s, removing 

###### Arguments

users, userId

#### `Blocker.getMappingOfUsersBlockingAUser`

Gets a cursor to the account block mapping affecting the user. Reading the actual code here might be more informative.

    Blocker.getMappingOfUsersBlockingAUser = function(userId) {
        return Collection.find({
            blockee: userId,
        });
    };

###### Arguments

* `userId*` *String* - The `_id` of the user to retrieve mapping for

###### Return Value

* `cursor` *Cursor* - a cursor to the account block mapping for the user

#### `Blocker.getUserIdsOfUsersBlockingAUser`

Get an array of `id`s belonging to users who have blocked the user specified.

For example, to see a list of users who blocked the user with `_id` `8qb2e86qqw`, you would run `Blocker.getUserIdsOfUsersBlockingAUser('8qb2e86qqw')`

###### Arguments

* `userId*` *String* - The user specified

###### Return Value

* `userIds` *[String]* - a list of `_id`s of users that was blocked

#### `Blocker.getUsersBlockingAUserCount`

Get the number of users who have blocked the user specified.

###### Arguments

* `userId*` *String* - The user specified

###### Return Value

* `count` *Number* - the number of users who have blocked the user specified

#### `Blocker.getUsersBlockingAUserCount`

Get the user objects of users who are blocking the user specified.

###### Arguments

* `userId*` *String* - The user specified

###### Return Value

* `cursor` *Cursor* - cursor from `Meteor.users` representing the users who are blocking the user specified

## Server-side methods

All methods have been namespaced with `brewhk:accounts-block/`

#### `brewhk:accounts-block/block`

Blocks a user.

###### Arguments

* `blockee*` *String* - The `_id` of the user to be blocked

###### Return Value

* `res` *Object* - Object containing the keys `numberAffected` and `insertedId`

#### `brewhk:accounts-block/unblock`

Unblocks a user.

###### Arguments

* `blockee*` *String* - The `_id` of the user to be blocked

###### Return Value

* `count` *Number* - The number of documents affected. Should be equal to `1`

#### `brewhk:accounts-block/getBlockedUsers`

Get a list of (restricted) user objects of users that current user has blocked.

###### Arguments

None

###### Return Value

* `users` *[Object]* - An array of user objects representing users the currently-logged in user has blocked. The restricted user object contains the following fields (if the fields actually exists in the document):
  * `username`
  * `profile.firstName`
  * `profile.lastName`
  * `settings.profile.firstName`
  * `settings.profile.lastName`
  * `settings.account.firstName`
  * `settings.account.lastName`

## Server-side publications

All publications have been namespaced with `brewhk:accounts-block/`

#### `brewhk:accounts-block/mappingOfUsersBlocked`

Returns a cursor to the account block mapping for the user. Simply calls `Blocker.getMappingForBlockedUsers` with the currently-logged in user's `id`.
