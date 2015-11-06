import log from "../../shared/consoleLog"
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import {
  getUser,
  getStory,
  getStories,
  getUsers
} from './database'

const Story = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    _id: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
    author: {
      type: User,
      resolve(parent, args, {}) {
        return getUser({id: parent.user_id});
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    stories: {
      type: new GraphQLList(Story),
      resolve(parent, args, {}) {
        return getStories({user_id: parent.id});
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: User,
      resolve(parent, args, {rootValue: {db}}) {
        db.collection('User').find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(JSON.stringify(result[0]));
          return JSON.stringify(result[0]);
        });
      }
    },
    users: {
      type: new GraphQLList(User),
      resolve(parent, {}, {}) {
        return getUsers();
      }
    },
    user: {
      type: User,
      args: {
        id: {
          type: GraphQLID
        },
        _id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        }
      },
      resolve(parent, args, {}) {
        return getUser(args);
      }
    },
    story: {
      type: Story,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, {_id}, {}) {
        return getStory({_id: _id});
      } 
    },
    stories: {
      type: new GraphQLList(Story),
      resolve(parent, args, {}) {
        return getStories(args);
      }
    },
  })
});

const Schema = new GraphQLSchema({
  query: Query
});
export default Schema;
