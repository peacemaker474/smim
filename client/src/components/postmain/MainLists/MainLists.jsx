import React from 'react';
import MainListsStyle from './MainLists.style';

function MainLists({ age, posts, onPostDetailMove}) {
  return (
    <MainListsStyle
      age={age}
      posts={posts}
      onPostDetailMove={onPostDetailMove}
    />
  );
}

export default MainLists;
