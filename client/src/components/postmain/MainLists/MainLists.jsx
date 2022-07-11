import React from 'react';
import MainListsStyle from './MainLists.style';

function MainLists({ age, posts }) {
  return <MainListsStyle age={age} posts={posts} />;
}

export default MainLists;
