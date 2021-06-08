const handleGetRetweets = async (req, res, psqlDB) => {
  try {
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

const getAllReTweetsData = async (psqlDB, retweets) => {
  const arrayOfPromises = await Promise.all(
    retweets.map(async (tweet) => {
      const retweetsData = await psqlDB
        .select("id", "username", "text")
        .from("tweet")
        .where("id", "=", tweet.post_id);

      const newTweetObject = {
        content: retweetsData[0].text,
        retweet_user: tweet.username,
        tweet_id: retweetsData[0].id,
        tweet_user: retweetsData[0].username,
        timestamp: new Date(Number(tweet.timestamp)),
      };

      console.log(newTweetObject);

      return newTweetObject;
    })
  );

  return arrayOfPromises;
};

module.exports = {
  handleGetRetweets: handleGetRetweets,
};
