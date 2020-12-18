import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';

export default function InterviewerListItem(props) {
  
  let interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  let interviewerImgClass = classNames('interviewers__item-image', {
    'interviewers__item--selected-image': props.selected
  })
  
  const nameSelected = () => {
    
    if (props.selected) {
      return props.name;
    }
  };

  return (

    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImgClass}
        src={props.avatar}
        alt={props.name}
      />
      {nameSelected()}
    </li>

  );
}