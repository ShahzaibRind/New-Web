import React, { useState, Fragment } from "react";

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import gql from "graphql-tag";
import { useQuery } from "react-query";

const GET_DATA = gql`
  query fetchPrivateTodos {
    todos {
      id
      title
      is_public
      is_completed
    }
  }
`;

const TodoPrivateList = (props) => {
  const [state, setState] = useState({
    filter: "all",
    clearInProgress: false, 
    todos: [
      
    ]
  });

  const filterResults = (filter) => {
    setState({
      ...state,
      filter: filter,
    });
  };

  const clearCompleted = () => {};
  const { todos } = props;
  let filteredTodos = todos;
  if (state.filter === "active") {
    filteredTodos = todos.filter((todo) => todo.is_completed !== true);
  } else if (state.filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.is_completed === true);
  }

  const todoList = [];
  filteredTodos.forEach((todo, index) => {
    todoList.push(<TodoItem key={index} index={index} todo={todo} />);
  });

  return (
    <Fragment>
      <div className="todoListWrapper">
        <ul>{todoList}</ul>
      </div>

      <TodoFilters
        todos={filteredTodos}
        currentFilter={state.filter}
        filterResultsFn={filterResults}
        clearCompletedFn={clearCompleted}
        clearInProgress={state.clearInProgress}
      />
    </Fragment>
  );
};

const DataList = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error to Fetch</div>;
  }
  return <TodoPrivateList todos={data.todos} />;
};

export default DataList;
