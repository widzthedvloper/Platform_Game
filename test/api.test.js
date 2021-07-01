/**
 * @jest-environment jsdom
 */

import fetchMock from 'jest-fetch-mock';

const { getScores, sendScore } = require('../api');

describe('getScores', () => {
  fetchMock.enableMocks();
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should returned a defined response', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 300, user: 'Marco' }] }));
    const response = await getScores();
    expect(response).toBeDefined();
  });

  it('should NOT return a Null response', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 300, user: 'Marco' }] }));
    const response = await getScores();
    expect(response).not.toBeNull();
  });

  it('should return a response with users score', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 3000, user: 'Marco' }] }));
    const response = await getScores();
    expect(response[0].score).toEqual(3000);
  });

  it('should NOT return a response that is wrong', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 3000, user: 'Marco' }] }));
    const response = await getScores();
    expect(response[0].score).not.toEqual(3000);
  });

  it('should NOT return a response that is undefined', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 3000, user: 'Marco' }] }));
    const response = await getScores();
    expect(response[0].score).not.toBeUndefined();
  });

  it('should NOT return a response that is Null', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 3000, user: 'Marco' }] }));
    const response = await getScores();
    expect(response[0].score).not.toBeNull();
  });
});

describe('sendScore', () => {
  it('should resolve succesfully with users input', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Successfully created record') }));
    await expect(sendScore('Marco', 300)).resolves.toEqual('Successfully created record');
  });

  it('should NOT resolve to an undefined response', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Successfully created record') }));
    await expect(sendScore('Marco', 300)).resolves.not.toBeUndefined();
  });

  it('should NOT resolve to an Null response', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Successfully created record') }));
    await expect(sendScore('Marco', 300)).resolves.not.toBeNull();
  });
});