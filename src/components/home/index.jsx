import React, { useState, useEffect } from "react";
import TaskList from "../taskList";
import AddTask from "../addTask";
import { fetchTaskLists } from "../../helpers";

const Home = ({ sideBar }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editId, setEditId] = useState("");

  const [task, setTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTaskLists();

      function comparePriority(a, b) {
        // converting to uppercase to have case-insensitive comparison
        const firstPrioriy = parseInt(a.assigned_to);
        const secondPrioriy = parseInt(b.assigned_to);

        let comparison = 0;

        if (firstPrioriy > secondPrioriy) {
          comparison = 1;
        } else if (firstPrioriy < secondPrioriy) {
          comparison = -1;
        }
        return comparison;
      }

      const result = data.sort(comparePriority);
      setTask(result);
    };
    fetchData();
  }, []);
  return (
    <div
      className={`${
        sideBar ? "w-[60%] lg:w-[65%] ml-[27%]" : "w-[90%] sm:w-[60%] mx-auto"
      }  mt-12`}
    >
      <AddTask
        setTask={setTask}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        editMessage={editMessage}
        editId={editId}
      />
      <TaskList
        task={task}
        setTask={setTask}
        setIsEditOpen={setIsEditOpen}
        setEditMessage={setEditMessage}
        setEditId={setEditId}
      />
    </div>
  );
};

export default Home;
