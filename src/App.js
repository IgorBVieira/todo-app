import "./App.css";

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <div className="todo-header">
        <h1>Todo List</h1>
      </div>
      <div className="form-todo">
        <p>Formulário</p>
      </div>
      <div className="list-todo">
        <h2>Lista de Tarefas:</h2>
        {todos.length === 0 && <div className="empty-todo">Nenhuma tarefa encontrada</div>}
      </div>
    </div>
  );
}

export default App;
