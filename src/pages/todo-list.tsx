import { FC } from "react";
import useSWR from "swr";
import { Todo } from "../types/api";
import lambdaFetcher from "../utils/lambdaFetcher";

const TodoListPage: FC = () => {
  const { data } = useSWR<Todo[], Error>('/todos', lambdaFetcher);

  if (typeof data === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Todo list</h1>
      <ul>
        {
          data.map(
            todo => (
              <li key={todo.id}>
                {todo.text}
              </li>
            )
          )
        }
      </ul>
    </>
  )
}

export default TodoListPage;
