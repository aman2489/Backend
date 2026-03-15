import { createContext, useState } from "react"

export const recipecontext = createContext(null);

const RecipeContext = ({children}) => {

    const [data, setData] = useState([]);
    console.log(data);
  return (
    <recipecontext.Provider value={{data, setData}}>
        {children}
    </recipecontext.Provider>
  )
}

export default RecipeContext
