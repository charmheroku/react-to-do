import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, customCategoriesState, toDoSelector, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDo = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const customCategories = useRecoilValue(
    customCategoriesState
  );
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };


  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDo));
  }, [toDo]);
  return (
    <div>
      <h1>To Dos</h1>
     
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategories !== [] &&
          customCategories.map((customCategory, idx) => (
            <option value={customCategory} key={idx}>
              {customCategory}
            </option>
          ))}
      </select>
      <CreateCategory/>
      <hr/>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
