import axios from "axios";

export const fetchTaskLists = async () => {
  const response = await axios("https://devza.com/tests/tasks/list", {
    headers: {
      AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
    },
  });
  const result = await response.data.tasks;
  // const data = result;
  // //.slice(0, 10)
  // setTaskList(data);
  return result;
};
