import axios from "axios";

export const getTweets = () => {
  return axios.get("/api/tweets/");
};

export const getUserTweets = (id) => {
  return axios.get(`/api/tweets/${id}`);
};

export const writeTweet = (tweet) => {
  return axios.post("/api/tweets/", tweet);
};
