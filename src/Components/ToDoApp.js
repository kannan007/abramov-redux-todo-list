import React from 'react';
import store from '../index';
import { FilterLink } from './FilterLink';

let nextToDoId = 0;

const getVisibleTodos = (todos, filter) => {
  switch(filter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t =>
        !t.completed
      );
    case 'SHOW_COMPLETED':
      return todos.filter(t =>
        t.completed
      );
  }
}
class ToDoApp extends React.Component {
  render(){
    //uses destructuring method to create variables from props
    const {
      todos,
      visibilityFilter
    } = this.props

    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return(
      <React.Fragment>
        <h1>todolist</h1>
        <div>
          <input ref={node => {
            this.input = node;
          }} />
          <button onClick={() =>{
            //dispatches the add todo action - which calls the root reducer, which calls the todo reducer
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextToDoId++
            });
            //empties input field after submission
            this.input.value = '';
          }}>
          Add ToDo
          </button>
          <ul>
            {visibleTodos.map(todo => {
              return <li key={todo.id}
                  onClick={() => {
                    store.dispatch({
                      type: 'TOGGLE_TODO',
                      id: todo.id
                    });
                  }}
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none'
                  }}>
                {todo.text}
              </li>
            })}
          </ul>
          <p>
            Show:
            {' '}
            <FilterLink
              filter='SHOW_ALL'
              currentFilter={visibilityFilter}>
              All
            </FilterLink>
            {' '}
            <FilterLink
              filter='SHOW_ACTIVE'
              currentFilter={visibilityFilter}>
              Active
            </FilterLink>
            {' '}
            <FilterLink
              filter='SHOW_COMPLETED'
              currentFilter={visibilityFilter}>
              Completed
            </FilterLink>
          </p>
        </div>
      </React.Fragment>
    )
  }
}



export default ToDoApp;
