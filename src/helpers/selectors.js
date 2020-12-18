export function getAppointmentsForDay(state, day) {

  let matchingDay = {};
  let results = [];

  if (state.days.length === 0) return results;
  
  for (const dayElem of state.days) {
    if (dayElem.name === day) {
      matchingDay = dayElem; 
    };
  }
  if (Object.keys(matchingDay).length === 0) return results;

  for (const appointment of matchingDay.appointments) {
    for (const aptment in state.appointments) {
      if (appointment === state.appointments[aptment].id) {
        results.push(state.appointments[aptment]);
      }
    }
  }
  return results;
}

export function getInterviewersForDay(state, day) {

  //find day in days array within state
  //object that matches provided day
  
  //for each interviewer, fill results array with
  //interviewer object

  let matchingDay = {};
  let results = [];

  if (state.days.length === 0) return results;
  
  for (const dayElem of state.days) {
    if (dayElem.name === day) {
      matchingDay = dayElem; 
    };
  }
  if (Object.keys(matchingDay).length === 0) return results;

  for (const interviewer of matchingDay.interviewers) {
    for (const intrvwr in state.interviewers) {
      if (interviewer === state.interviewers[intrvwr].id) {
        results.push(state.interviewers[intrvwr]);
      }
    }
  }
  return results;
}

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const results = interview;

  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      results.interviewer = state.interviewers[interviewer];
      return results;
    }
  }
};