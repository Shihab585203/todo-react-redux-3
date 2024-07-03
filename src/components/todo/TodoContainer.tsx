// import { useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { useGetTodosQuery } from "../../redux/api/api";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
  const [priority, setPriority] = useState("");
  console.log(priority);

  // From Local State
  // const { todos } = useAppSelector((state) => state.todos);

  //From Server
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery(priority);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between my-3">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority}/>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white rounded-lg p-3">
          {todos?.data?.length > 0 ? (
            todos?.data?.map((item) => <TodoCard key={item._id} {...item} />)
          ) : (
            <p className="bg-white p-2 text-center font-bold rounded-md">
              There is no task pending
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
