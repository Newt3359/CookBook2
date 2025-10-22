import SplashPage from "./Pages/SplashPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddRecipe} from "./Pages/AddRecipe.tsx";
import {ReadRecipe} from "./Pages/ReadRecipe.tsx";



function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashPage/>}/>
                <Route path="/add" element={<AddRecipe/>}/>
                <Route path="/read" element={<ReadRecipe/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
