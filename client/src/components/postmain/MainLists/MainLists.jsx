import React from 'react';
import MainListsStyle from './MainLists.style';

function MainLists({ age, posts, onPostListsMove, onPostDetailMove}) {
  return (
    <MainListsStyle
      age={age}
      posts={posts}
      onPostListsMove={onPostListsMove}
      onPostDetailMove={onPostDetailMove}
    />
  );
}

export default MainLists;
