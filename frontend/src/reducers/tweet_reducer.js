import {
  RECEIVE_TWEETS,
  RECEIVE_NEW_TWEET,
  RECEIVE_USER_TWEETS,
} from "../actions/tweet_actions";

const TweetsReducer = (
  state = { all: {}, new: undefined, user: {} },
  action
) => {
  //this is where we need to be careful of pulling out tweets from data
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_TWEETS:
      newState.all = action.tweets.data;
      return newState;
    case RECEIVE_USER_TWEETS:
      newState.user = action.tweets.data;
      return newState;
    case RECEIVE_NEW_TWEET:
      newState.new = action.tweet.data;
      return newState;
    default:
      return state;
  }
};

export default TweetsReducer;
