import React from 'react';
import QuestionListPresenter from './QuestionList.style';

function QuestionList({ age, post }) {
  return <QuestionListPresenter age={age} post={post} />;
}

export default QuestionList;
