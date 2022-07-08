import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { fetchTaskLists } from "../../helpers";
import Toastify from "toastify-js";

const AddTask = ({
  isEditOpen,
  setIsEditOpen,
  editMessage,
  editId,
  setTask,
}) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [priority, setPriority] = useState("");
  const [editInput, setEditInput] = useState("");

  const priorityData = [
    { id: "1", data: "High Proiority" },
    { id: "2", data: "Mid Proiority" },
    { id: "3", data: "Low Proiority" },
  ];

  // FUNCTION FOR ADDING DATA
  const addTask = async () => {
    const due_date = new Date();
    var myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    var formdata = new FormData();
    formdata.append("message", input);
    formdata.append("due_date", due_date);
    formdata.append("priority", priority);
    formdata.append("assigned_to", user);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://devza.com/tests/tasks/create",
      requestOptions
    );
    const result = await response.text();
    if (result) {
      Toastify({
        text: "User Deleted Successfully",
        className: " fixed top-10 right-5 z-30 text-sm px-4 py-2 text-white",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      setInput("");
      setIsEditOpen((open) => !open);
      fetchData();
    }

    setInput("");
    setUser("");
    setPriority("");
  };
  // FUNCTION FOR UPDATEING DATA
  const updateTask = async () => {
    if (editInput.length > 0) {
      var myHeaders = new Headers();
      myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

      var formdata = new FormData();
      formdata.append("message", editInput);
      formdata.append("due_date", "2020-09-19 12:12:12");
      formdata.append("priority", priority);
      formdata.append("assigned_to", user);
      formdata.append("taskid", editId);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://devza.com/tests/tasks/update",
        requestOptions
      );
      const result = await response.text();
      if (result) {
        Toastify({
          text: "User Updated Successfully",
          className: "fixed top-10 right-5 z-300 text-sm px-4 py-2 text-white",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        fetchData();
        setEditInput("");
        setIsEditOpen((open) => !open);
      }
    } else {
      alert("Add edited task first");
    }
  };
  // AFTER ADDING OR UPDATING DATA FILTER FUNCTION
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

  // USEEFFECT
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios("https://devza.com/tests/tasks/listusers", {
        headers: {
          AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
        },
      });
      const result = await response.data.users;
      setLoggedInUser(result);
    };

    fetchUsers();
  }, [setLoggedInUser]);

  return (
    <section className="mb-5 flex items-center flex-col">
      {isEditOpen ? (
        <input
          type="text"
          className="w-full  px-3
          py-1.5 pl-4 border-none outline-none rounded-md"
          placeholder={editMessage}
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full  px-3
          py-1.5 pl-4 border-none outline-none rounded-md"
          placeholder="Enter task to add..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      )}

      <div className="w-full flex items-center mt-2 space-x-2">
        <span className=" w-[50%] flex">
          <select
            className=" form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select priority</option>
            {priorityData.map((item) => (
              <option value={item.id} key={item.id}>
                {item.data}
              </option>
            ))}
          </select>
        </span>
        <span className="w-[50%] flex">
          <select
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="">Select User</option>
            {loggedInUser.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </span>
      </div>

      <button
        className={`last:bg-orange-500 text-white w-32 py-2 hover:bg-orange-400 self-end mt-3`}
        onClick={isEditOpen ? updateTask : addTask}
      >
        {isEditOpen ? "Update Task" : "Add Task"}
      </button>
    </section>
  );
};

export default AddTask;
