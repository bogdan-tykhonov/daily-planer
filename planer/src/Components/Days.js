import React, { useContext } from "react";
import { GoPlus } from "react-icons/go";
import Task from "./Task";
import Modal from "./Modal";
import Context from "./Context";
export default function Days(props) {
  let modal = {
    shouldRender: false,
  };
  let tasks = props.dayProps.tasks;
  let tasksList;
  if (tasks.length) {
    tasksList = tasks.map((task) => {
      return <Task task={task} key={task.id} />;
    });
  } else tasksList = <h1>No tasks for this day</h1>;
  return (
    <div className="day">
      <section className="day-header">
        <h1>{props.dayProps.name}</h1>
        <Modal
          dayProps={{ name: props.dayProps.name, id: props.dayProps.id }}
        />
      </section>
      <section className="tasks">{tasksList}</section>
    </div>
  );
}
