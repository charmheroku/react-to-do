import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, customCategoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoriesState);
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
        const oldToDo = oldToDos.filter((toDo) => toDo.id !== id)
        console.log(oldToDo);
        return [...oldToDo];
    }
    )
}
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {customCategories !== [] &&
        customCategories.map((customCategory, idx) => {
          if (customCategory !== category) {
            return (
              <button name={customCategory} key={idx} onClick={onClick}>
                {customCategory}
              </button>
            );
          }
          return null
        })}
      <button key={id} onClick={onDelete}>
        🗑️
      </button>
    </li>
  );
}

export default ToDo;
