import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex justify-center gap-x-10 text-sm mb-10 items-center">
      <NavLink to="/" className={(e) => e.isActive && "text-red-300"} >Home</NavLink>
      <NavLink to="/recipes" className={(e) => e.isActive && "text-red-300"} >Recipes</NavLink>
      <NavLink to="/about" className={(e) => e.isActive && "text-red-300"} >About</NavLink>
      <NavLink to="/create-recipe" className={ (e) => `px-4 py-2 bg-gray-900 rounded active:scale-[0.95] ${e.isActive ? "text-red-300" : ""}`} >Create Recipe</NavLink>
    </div>
  )
}

export default Navbar
