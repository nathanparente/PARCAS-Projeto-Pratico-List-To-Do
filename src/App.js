import React, {useState, useEffect} from "react";
import './App.css';
//Importando Componentes
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  //RUN once where the app starts 
  
  useEffect(() => {
    getLocalTodos();
  }, [])

  //State
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

  //UseEffect
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  //Functions
  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed == true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed == false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //Save to Local
  
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    //getLocalTodos();
    console.log(localStorage)
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === 0){
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }
  } 
  

  return (
    <div className="App">
      <header>
        <h1>Nathan To do List </h1>
      </header>
      <Form 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        setInputText={setInputText} 
        setStatus={setStatus}
        />
      <TodoList 
        setTodos={setTodos} 
        todos={todos} 
        filteredTodos={filteredTodos}
        />
    </div>
  );
}

export default App;
