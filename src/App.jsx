import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      task: "",
      description: "",
      todos: [
        {
          name: "1",
          description: "",
          checked: false,
          createdAt: new Date().toLocaleTimeString(),
          createdDate: new Date().toLocaleDateString(),
        },
        {
          name: "1",
          description: "",
          checked: true,
          createdAt: new Date().toLocaleTimeString(),
          createdDate: new Date().toLocaleDateString(),
        },
      ],
      showOnlyUncompleted: false,
    };
  }

  handleTaskChange = (e) => {
    this.setState({ task: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleTodoAdd = () => {
    const { task, description, todos } = this.state;
    if (task.trim()) {
      const newTodo = {
        name: task,
        description,
        checked: false,
        createdAt: new Date().toLocaleTimeString(),
        createdDate: new Date().toLocaleDateString(),
      };
      this.setState({
        task: "",
        description: "",
        todos: [newTodo, ...todos],
      });
    }
  };

  handleTodoChecked = (index) => (e) => {
    const updatedTodos = this.state.todos
      .map((todo, i) =>
        i === index ? { ...todo, checked: e.target.checked } : todo
      )
      .sort((a, b) => a.checked - b.checked);

    this.setState({ todos: updatedTodos });
  };

  handleTodoDelete = (index) => () => {
    const updatedTodos = this.state.todos.filter((_, i) => i !== index);
    this.setState({ todos: updatedTodos });
  };

  handleFilterChange = (e) => {
    this.setState({ showOnlyUncompleted: e.target.checked });
  };

  render() {
    const { task, description, todos, showOnlyUncompleted } = this.state;
    const filteredTodos = showOnlyUncompleted
      ? todos.filter((todo) => !todo.checked)
      : todos;

    return (
      <div>
        <h1>Task Manager App</h1>
        <p>Total tasks: {this.state.todos.length}</p>
        <div className="add-task-container">
          <div className="add-task">
            <div className="task-input">
              <input
                type="text"
                value={task}
                onChange={this.handleTaskChange}
                placeholder="Add task"
              />
              <button onClick={this.handleTodoAdd}>Add</button>
            </div>
          </div>
          <div className="add-description">
            <textarea
              value={description}
              onChange={this.handleDescriptionChange}
              placeholder="Add a description"
            />
          </div>
        </div>
        <div className="todo-list">
          <div className="filter">
            <span>FILTER:</span>
            <input
              type="checkbox"
              checked={showOnlyUncompleted}
              onChange={this.handleFilterChange}
            />
            <span>Show only uncompleted</span>
          </div>
          <ul>
            {filteredTodos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                onTodoChecked={this.handleTodoChecked(index)}
                onDelete={this.handleTodoDelete(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDelete: false };
  }

  render() {
    const { todo, onTodoChecked, onDelete } = this.props;
    return (
      <li
        style={{ color: todo.checked ? "grey" : "black", listStyle: "none" }}
        onMouseEnter={() => this.setState({ showDelete: true })}
        onMouseLeave={() => this.setState({ showDelete: false })}
      >
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={onTodoChecked}
        />
        <div className="todo-content">
          <b>{todo.name}</b>
          <p>{todo.description}</p>
          <span>
            {todo.createdDate} {todo.createdAt}
          </span>
        </div>
        {this.state.showDelete && <button onClick={onDelete}>Delete</button>}
      </li>
    );
  }
}

export default App;
