import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, customCategoriesState } from "../atoms";
import styled from "styled-components";

interface IForm {
  customCategory: string;
}

const ToDoBtn = styled.button``;

const ToDoForm = styled.form`
  
  }
`;

function CreateCategory() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const [customCategories, setCustomCategories] = useRecoilState(
    customCategoriesState
  );
  const setCategory = useSetRecoilState(categoryState);

  const handleValid = ({ customCategory }: IForm) => {
    setValue("customCategory", "");
    setCategory(customCategory as any);
    setCustomCategories((oldCategories) => {
      return [...oldCategories, customCategory];
    });
    
  };

  useEffect(() => {
    localStorage.setItem("CATEGORIES_KEY", JSON.stringify(customCategories));
  }, [customCategories]);

  return (
    <ToDoForm onSubmit={handleSubmit(handleValid)}>
      <div>
        <input
          {...register("customCategory", {
            required: "The name cannot exceed 8 letters",
            minLength: 3,
            maxLength: 8,
          })}
          placeholder="Make Your Category"
          type="text"
        />
        <ToDoBtn>Add category</ToDoBtn>
      </div>
      <span>{errors.customCategory?.message}</span>
    </ToDoForm>
  );
}

export default CreateCategory;
