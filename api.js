import 'regenerator-runtime/runtime';

const getScores = async () => {
  try {
    const apiResponse = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/y3AqkaM7j6qpW6NV4xkJ/scores/');
    const apiScore = await apiResponse.json();
    return apiScore.result;
  } catch (error) {
    return error.message;
  }
};

const sendScore = async (name, score) => {
  const params = {};
  params.user = name;
  params.score = score;
  try {
    const apiResponse = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/y3AqkaM7j6qpW6NV4xkJ/scores/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return apiResponse.json();
  } catch (error) {
    return error.message;
  }
};

module.exports = { getScores, sendScore };