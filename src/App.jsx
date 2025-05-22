import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isDone: false},
    { id: 1, content: "코딩 공부하기", isDone: false },
    { id: 2, content: "잠 자기", isDone: false },
  ]);

  return (
    <>
     <h1 className="app-header"> My Todo App</h1>

      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
         placeholder="할 일을 입력하세요"
      />
      <button
        onClick={() => {
          if (!inputValue.trim()) return; 
          const newTodo = {
            id: Number(new Date()),
            content: inputValue,
            isDone: false, 
          };
          setTodoList([...todoList, newTodo]);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const toggleDone = () => {

    setTodoList((prev) => 
        prev.map((el) =>
          el.id === todo.id ? { ...el, isDone: !el.isDone } : el
        )
      );
  }
  return (
    <li>
  <input type="checkbox" checked={todo.isDone} onChange={toggleDone} />
        
      {isEdit ?  (
        <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      ) : (
        <span
        style={{
          textDecoration: todo.isDone ? "line-through" : "none",
          color: todo.isDone ? "gray" : "black", 
        }}
        >
        {todo.content}
        </span>
      )}
      <button
        onClick={() => {
          if (isEdit) {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
        } else { setInputValue(todo.content);
        }
        setIsEdit(!isEdit);
      }}
      >
        {isEdit ? "저장" : "수정"}
        
      </button>

      <button
        onClick={() => {
            setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
          }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
