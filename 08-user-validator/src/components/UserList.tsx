import React from "react";
import "./UserList.css";

interface data {
  name: string;
  age: string;
}

const UserList: React.FC<{ data: data[] }> = ({ data }) => {
  return (
    <ul className="user-list">
      {data.map((user, idx) => {
        return (
          <li key={idx}>
            <p>{user.name + `(${user.age})`}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
