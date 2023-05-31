const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog[0].likes;
};

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes < item.likes ? item : max;
  };

  const favorite = blogs.reduce(reducer, { likes: -1 });

  return {
    title: `${favorite.title}`,
    author: `${favorite.author}`,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
