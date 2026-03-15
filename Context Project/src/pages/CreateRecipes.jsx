import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { recipecontext } from "../context/RecipeContext";

const CreateRecipes = () => {

  const {data, setData} = useContext(recipecontext);

    const {register, handleSubmit, reset} = useForm();

    const submitHandler = (recipe) => {
      recipe.id = nanoid()
      setData([...data, recipe]);
      reset();
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input {...register("image")} 
         className="border-b outline-0 p-2 block w-50"
         type="url"
          placeholder="Enter image url" 
          />
          <small className="text-red-400">This is how the error will be shown</small>

        <input {...register("title")} 
         className="border-b outline-0 p-2 block w-50"
         type="text"
          placeholder="Recipe Title" 
          />
          <small className="text-red-400">This is how the error will be shown</small>
        
        <input {...register("chef-name")} 
         className="border-b outline-0 p-2 block w-50"
         type="text"
          placeholder="Chef name" 
          />
          <small className="text-red-400">This is how the error will be shown</small>
        
        <textarea {...register("description")} 
         className="border-b outline-0 p-2 block w-50"
         type="text"
          placeholder="Start the Recipe description from here..." 
          ></textarea>
          <small className="text-red-400">This is how the error will be shown</small>

        <textarea {...register("ingredients")} 
         className="border-b outline-0 p-2 block w-50"
         type="text"
          placeholder="Write Ingredients seperated by comma..." 
          ></textarea>
          <small className="text-red-400">This is how the error will be shown</small>

        <textarea {...register("istructions")} 
         className="border-b outline-0 p-2 block w-50"
         type="text"
          placeholder="Write Instructions seperated by comma..." 
          ></textarea>
          <small className="text-red-400">This is how the error will be shown</small>
          
          <select {...register("categories")} 
         className="border-b outline-0 p-2 block w-50"
          >
            <option className="text-black" value="cat-1">Category 1</option>
            <option className="text-black" value="cat-2">Category 2</option>
            <option className="text-black" value="cat-3">Category 3</option>
          </select>

          <button className="block mt-5 bg-gray-900 px-4 py-2 rounded cursor-pointer">Save Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipes
