import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    const combinedTask = `${input} ${input2}`.trim(); // Combine both inputs
    axios.post(`${baseURL}/save`, { task: combinedTask }).then(() => {
      setInput("");
      setInput2(""); // Clear the second input as well
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then(() => {
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <>
      <main className="main">
        <h1 className="title">CRUD Operations</h1>
        <div className="input_holder">
          <input
            className="myPadding"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            className="myPadding"
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <button className="myPadding" type="submit" onClick={updateId ? updateTask : addTask}>
            {updateId ? "Update Task" : "Add Task"}
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </ul>
      </main>
    </>

  );
};

export default App;
