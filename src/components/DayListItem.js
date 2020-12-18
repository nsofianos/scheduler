import React from "react";
import 'components/DayListItem.scss';
import classNames from 'classnames/bind';

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {
    //'day-list__item': props.spots > 0 && !props.selected,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });


  const formatSpots = () => {
    let spotsRemaining = `${props.spots} spots remaining`;
    if (props.spots === 1) spotsRemaining = `${props.spots} spot remaining`;
    if (props.spots === 0) spotsRemaining = "no spots remaining";
    return spotsRemaining;
  }


  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}