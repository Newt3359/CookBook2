import SplashPage from "./Pages/SplashPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";



function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
