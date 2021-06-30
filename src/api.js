import 'regenerator-runtime/runtime';

const myId = 'y3AqkaM7j6qpW6NV4xkJ';
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const getScores = async () => {
  try {
    const apiResponse = await fetch(`${url}/games/${myId}/scores/`);
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
    const apiResponse = await fetch(`${url}/games/${myId}/scores/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(params),
    });
    return apiResponse.json();
  } catch (error) {
    return error.message;
  }
};

export { getScores, sendScore };