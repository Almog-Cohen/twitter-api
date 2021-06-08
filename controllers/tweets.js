// search for all avilable tweets and send them back to the client
const handleGetTweets = async (req, res, psqlDB) => {
  try {
    // Get all tweets data
    const tweets = await psqlDB.select("*").from("tweet");
    const getTweetsData = await getAllTweetsData(psqlDB, tweets);
    getTweetsData && getTweetsData.length
      ? res.json(getTweetsData)
      : res.status(404).json("No existing tweets");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error in the server");
  }
};
// Add new tweet to the database.
const handleInsertNewTweet = async (req, res, psqlDB) => {
  const { username, content } = req.body;
  try {
    const newTweet = await psqlDB("tweet").insert({
      username: username,
      text: content,
      timestamp: new Date().getTime(),
    });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error in the server");
  }
};

// Add new like to the database.
const handleInsertLike = async (req, res, psqlDB) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const newTweet = await psqlDB("likes").insert({
      post_id: id,
      username: username,
      timestamp: new Date().getTime(),
    });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error in the server");
  }
};

// Add new retweet to the database.
const handleInsertNewRetweet = async (req, res, psqlDB) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const newTweet = await psqlDB("retweet").insert({
      post_id: id,
      username: username,
      timestamp: new Date().getTime(),
    });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error in the server");
  }
};

// Get all the tweets data.
// For each tweet we add likes count and retweet count.
const getAllTweetsData = async (psqlDB, tweets) => {
  const arrayOfPromises = await Promise.all(
    tweets.map(async (tweet) => {
      // Get sum of retweets
      const retweetsSum = await psqlDB
        .count("*")
        .from("retweet")
        .where("post_id", "=", tweet.id);
      // Get sum of likes
      const likesSum = await psqlDB
        .count("*")
        .from("likes")
        .where("post_id", "=", tweet.id);
      // Creating new tweet object
      const newTweetObject = {
        id: tweet.id,
        content: tweet.text,
        username: tweet.username,
        timestamp: new Date(Number(tweet.timestamp)),
        like_count: likesSum[0].count,
        retweet_count: retweetsSum[0].count,
      };

      return newTweetObject;
    })
  );

  return arrayOfPromises;
};

module.exports = {
  handleGetTweets: handleGetTweets,
  handleInsertNewTweet: handleInsertNewTweet,
  handleInsertLike: handleInsertLike,
  handleInsertNewRetweet: handleInsertNewRetweet,
};
