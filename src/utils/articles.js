const axios = require('axios');

const getArticles = topic => {
  return axios({
    method: 'GET',
    params: { topic },
    url: 'https://shubwub-nc-news.herokuapp.com/api/articles'
  }).then(({ data }) => {
    return data;
  });
};

const getArticleById = async id => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles/${id}`
  );
  return data.article;
};

const sortArticlesQuery = async (sort_by, order, topic) => {
  const { data } = await axios.get(
    `https://shubwub-nc-news.herokuapp.com/api/articles`,
    { params: { topic, sort_by, order } }
  );
  return data.articles;
};

const handleVote = async (val, id, type) => {
  const { data } = await axios.patch(
    `https://shubwub-nc-news.herokuapp.com/api/${type}s/${id}`,
    { inc_votes: val }
  );
  return data[type];
};

const formatDates = articles => {
  return articles.map(article => {
    const date = new Date(article.created_at);
    const displayDate = date.toDateString();
    article.created_at = displayDate;
    return article;
  });
};

export {
  formatDates,
  handleVote,
  sortArticlesQuery,
  getArticleById,
  getArticles
};
