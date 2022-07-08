import React, { useRef } from "react";
import Toastify from "toastify-js";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { fetchTaskLists } from "../../helpers";

const TaskList = ({
  setIsEditOpen,
  setEditMessage,
  setEditId,
  task,
  setTask,
}) => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  //
  const dragStart = (position) => {
    dragItem.current = position;
  };
  //
  const dragEnter = (position) => {
    dragOverItem.current = position;
  };
  // drag unction for list update
  const drop = () => {
    const copyListItems = [...task];

    const dragItemContent = copyListItems[dragItem.current];

    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTask(copyListItems);
  };

  // Delete Task from database

  const deteleTask = (idx) => {
    var myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    var formdata = new FormData();
    formdata.append("taskid", idx);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/delete", requestOptions)
      .then((response) => response.text())
      .then(() => {
        Toastify({
          text: "User Deleted Successfully",
          className: " fixed top-10 right-5 z-30 text-sm px-4 py-2 text-white",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        fetchData();
      })
      .catch((error) => console.log("error", error));
  };

  const fetchData = async () => {
    const data = await fetchTaskLists();

    function comparePriority(a, b) {
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

  return (
    <>
      {task &&
        task?.map((item, index) => (
          <div
            className={` bg-slate-400 hover:bg-slate-500 mb-1 pr-5 flex items-center space-x-2 justify-between h-12 text-base cursor-move group md:w-full`}
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragEnd={drop}
            draggable
            key={item.id}
          >
            <div className="flex items-center">
              <span
                className={`w-4 h-12 ${
                  item.assigned_to === "1"
                    ? "bg-red-500"
                    : item.assigned_to === "2"
                    ? "bg-green-500"
                    : item.assigned_to === "3"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                } `}
              ></span>
              <span className="pl-2 truncate text-white">{item.message}</span>
            </div>
            <span className=" space-x-3 justify-between w-12 hidden group-hover:flex">
              <FaEdit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  setIsEditOpen((open) => !open);
                  setEditMessage(item.message);
                  setEditId(item.id);
                }}
              />
              <FaTrashAlt
                className="cursor-pointer text-red-400"
                onClick={() => deteleTask(item.id)}
              />
            </span>
          </div>
        ))}
    </>
  );
};

export default TaskList;
