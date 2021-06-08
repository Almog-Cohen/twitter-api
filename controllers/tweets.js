// Get specific user data from the database
const handleGetTweets = async (req, res, psqlDB) => {
  try {
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

//
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

const getAllTweetsData = async (psqlDB, tweets) => {
  const arrayOfPromises = await Promise.all(
    tweets.map(async (tweet) => {
      const retweetsSum = await psqlDB
        .count("*")
        .from("retweet")
        .where("post_id", "=", tweet.id);

      const likesSum = await psqlDB
        .count("*")
        .from("likes")
        .where("post_id", "=", tweet.id);

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
