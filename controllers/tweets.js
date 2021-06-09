// search for all available tweets and send them back to the client
const handleGetTweets = async (req, res, psqlDB) => {
  try {
    // Get all tweets data
    const getTweetsData = await getAllTweetsData(psqlDB);
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
    console.log(newTweet);
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
  // This query will get all tweets data + retweet count and likes count.
  //   SELECT * from tweet
  //   LEFT JOIN (
  //   SELECT *
  // FROM (SELECT post_id,COUNT(post_id) as retweet_count
  //      FROM retweet
  //      GROUP BY post_id
  //     ) r FULL JOIN
  //     (SELECT post_id, COUNT(post_id) as likes_count
  //      FROM likes
  //      GROUP BY post_id
  //     ) l
  //     USING (post_id)
  //   )
  //   AS b on tweet.id=b.post_id
};

module.exports = {
  handleGetTweets: handleGetTweets,
  handleInsertNewTweet: handleInsertNewTweet,
  handleInsertLike: handleInsertLike,
  handleInsertNewRetweet: handleInsertNewRetweet,
};
