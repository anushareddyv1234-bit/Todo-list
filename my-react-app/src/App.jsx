import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch todos
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add or Update todo
  const handleSubmit = () => {
    if (editId) {
      fetch(`http://localhost:5000/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      }).then(() => {
        setTodos(todos.map(todo =>
          todo.id === editId ? { ...todo, text } : todo
        ));
        setEditId(null);
        setText("");
      });
    } else {
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      })
        .then(res => res.json())
        .then(newTodo => {
          setTodos([...todos, newTodo]);
          setText("");
        });
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  // Edit todo
  const editTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };
  console.log("hello")

  return (
    <div style={{ padding: "30px" }}>
      <h2>Simple Todo App</h2>

      <input
        type="text"
        value={text}
        placeholder="Enter todo"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
