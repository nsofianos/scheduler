import React from "react";
import "components/Appointment/styles.scss";
import "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        console.log(error);
        transition(ERROR_SAVE, true)
      })
  }

  const remove = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => {
      console.log(error)
      transition(ERROR_DELETE, true)
    })
  };

  return (
    <article data-testid="appointment">
      <Header time={props.time}/>

      {mode === SHOW && 
      (<Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.name} 
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />)}

      {mode === EMPTY && 
      (<Empty 
          onAdd={() => transition(CREATE)}
      />)}

      {mode === CREATE && 
      (<Form 
          onSave={save} 
          onCancel={back} 
          interviewers={props.interviewers}
      />)}

      {mode === SAVING && 
      (<Status 
          message={"Saving..."}
      />)}

      {mode === DELETING && 
      (<Status 
         message={"Deleting..."}
      />)}

      {mode === CONFIRM && 
      (<Confirm 
         message={"Are you sure you want to delete?"} 
         onConfirm={remove} 
         onCancel={() => back()}
      />)}

      {mode === EDIT && 
      (<Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={save} 
        onCancel={back} 
        interviewers={props.interviewers}
      />)}

      {mode === ERROR_SAVE &&
      (<Error
        message="Could not save appointment."
        onClose={() => back()}
      />)}

      {mode === ERROR_DELETE &&
      (<Error
        message="Could not delete appointment."
        onClose={() => back()}
      />)}
    </article>
  );
}
  