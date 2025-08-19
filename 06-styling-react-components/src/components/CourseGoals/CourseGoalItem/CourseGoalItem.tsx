import React from "react";

import "./CourseGoalItem.css";

const CourseGoalItem: React.FC<{
  onDelete: (id: string) => void;
  id: string;
  children: React.ReactNode;
}> = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className="goal-item" onClick={deleteHandler}>
      {props.children}
    </li>
  );
};

export default CourseGoalItem;
