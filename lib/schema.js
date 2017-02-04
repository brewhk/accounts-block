import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
    blocker: {
        type: String
    },
    blockee: {
        type: String
    }
});
