import "./App.css";

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    //Enviar dados para o banco com fetch POST
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    });

    // Atualizar o estado de tarefas com os novos dados.
    setTodos((prevState) => [...prevState, todo]);

    setTime("");
    setTitle("");
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          console.error(err);
          setLoading(false); 
          alert("Erro ao carregar tarefas");
        });

      setLoading(false);
      setTodos(res);
    };

    loadData();
  },[]);

  const handleDelete = async (id) => {
    await fetch(API + '/todos/' + id,{
      method: 'DELETE',
    })
    // Atualizar o estado de tarefas com os novos dados mas somente os que não foram deletados.
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));

  }


  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1>Todo List</h1>
      </div>
      <div className="form-todo">
        <p>Insira sua próxima tarefa:</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer?</label>
            <input
              type="text"
              name="title"
              placeholder="Titulo da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duração: </label>
            <input
              type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value={"Criar Tarefa"} />
        </form>
      </div>
      <div className="list-todo">
        <h2>Lista de Tarefas:</h2>
        {todos.length === 0 && (
          <div className="empty-todo">Nenhuma tarefa encontrada</div>
        )}
        {todos.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <h3 className={todo.done ? 'todo-done' : 'todo-not-done'}>{todo.title}</h3>
              <p>Tempo estimado: {todo.time}</p>
              <span>
                {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
