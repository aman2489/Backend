import { useDispatch, useSelector } from "react-redux"
import { decreament, increament } from "./redux/slices_features/couterSlice";



const App = () => {

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  return (
    <>
      <div className="counter">
        <h1>{counter}</h1>
      
      <button
      onClick={() => {
        if(counter > 0){
          dispatch(decreament()); 
        }
      }}
      >Decreament</button>
      <button
      onClick={() => {
        dispatch(increament());
      }}
      >Increament</button>
      </div>
    </>
  )
}

export default App
