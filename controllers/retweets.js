// search for all avilable retweets and send them back to the client
const handleGetRetweets = async (req, res, psqlDB) => {
  try {
    // Get all the retweets data
    const getRetweetsData = await getAllReTweetsData(psqlDB);
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
const getAllReTweetsData = async (psqlDB) => {
  // This query giving as all the retweets data + content text, username and user id.
  //   SELECT tweet.id,tweet.username as tweetuser,retweet.username as retweetuser,text,retweet.timestamp
  //   FROM retweet,tweet
  // WHERE tweet.id = retweet.post_id;
};

module.exports = {
  handleGetRetweets: handleGetRetweets,
};
