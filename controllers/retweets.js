// search for all avilable retweets and send them back to the client
const handleGetRetweets = async (req, res, psqlDB) => {
  try {
    // Get all the retweets data
    const retweets = await psqlDB("retweet").distinctOn("post_id");
    const getRetweetsData = await getAllReTweetsData(psqlDB, retweets);
    getRetweetsData && getRetweetsData.length
      ? res.json(getRetweetsData)
      : res.status(404).json("No existing retweets");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error in the server");
  }
};
// Get all the retweets data.
// For each retweet we add content text, user name and id
const getAllReTweetsData = async (psqlDB, retweets) => {
  const arrayOfPromises = await Promise.all(
    retweets.map(async (tweet) => {
      const retweetsData = await psqlDB
        .select("id", "username", "text")
        .from("tweet")
        .where("id", "=", tweet.post_id);
      // Creating new retweet object
      const newRetweetObject = {
        content: retweetsData[0].text,
        retweet_user: tweet.username,
        tweet_id: retweetsData[0].id,
        tweet_user: retweetsData[0].username,
        timestamp: new Date(Number(tweet.timestamp)),
      };
      return newRetweetObject;
    })
  );

  return arrayOfPromises;
};

module.exports = {
  handleGetRetweets: handleGetRetweets,
};
