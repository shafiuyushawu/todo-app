import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TodoForm from './TodoForm';

const Todo = ({
  todos, completeTodo, removeTodo, updateTodo,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={todo.id}
    >
      <button
        type="button"
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
        onKeyDown={(e) => e.key === 'Enter' && completeTodo(todo.id)}
      >
        {todo.text}
      </button>
      <div className="icons">
        <FaEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
        <FaTrash onClick={() => removeTodo(todo.id)} className="delete-icon" />
      </div>
    </div>
  ));
};

Todo.defaultProps = {
  completeTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
};

Todo.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  completeTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  updateTodo: PropTypes.func,
};

export default Todo;
