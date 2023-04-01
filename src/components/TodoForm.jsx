import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: uuidv4(),
      text: input,
    });
    setInput('');
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        <>
          <input
            type="text"
            placeholder="Update todo"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit" className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add to do"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit" className="todo-button">
            Add Todo
          </button>
        </>
      )}
    </form>
  );
}

TodoForm.defaultProps = {
  onSubmit: () => {},
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  edit: PropTypes.arrayOf({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoForm;
