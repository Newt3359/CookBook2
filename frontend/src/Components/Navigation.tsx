import {useLocation, useNavigate} from 'react-router-dom'
import {BadgePlus, BookOpenText, ChefHat, Home} from "lucide-react";

export function Navigation(){

    const navigate = useNavigate();

    const location = useLocation();

    const currentPage = location.pathname

    const handleHome = () =>{
        navigate("/");
    }

    const handleAddRecipe = () =>{
        navigate("/add")
    }

    const handleReadRecipe = () =>{
        navigate("/read")
    }

    return(
        <>
            <nav className={"border-b-2 border-black bg-blue-300 text-black shadow-md sticky top-0 z-50"} data-testid={"navbar"}>
                <div className={"max-w-12xl mx-auto px-4 sm:px-6 lg:px-8"}>
                    <div className={"flex items-center justify-between h-20"}>
                        <div className={"flex items-center"}>
                            <ChefHat className={"size-20"}/>
                        </div>
                        <div className={"flex space-x-3 items-center"}>

                            <button
                                onClick={handleHome}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                    currentPage === "/"
                                        ? "bg-orange-200 text-black shadow-md"
                                        : "text-[#403F4C] hover:bg-orange-300/30"
                                }`}
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </button>

                            <button
                                onClick={handleAddRecipe}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                    currentPage === "/add"
                                        ? "bg-orange-200 text-black shadow-md"
                                        : "text-[#403F4C] hover:bg-orange-300/30"
                                }`}
                            >
                                <BadgePlus className={"w-4 h-4"}/>
                                <span>Add Recipe</span>
                            </button>

                            <button
                                onClick={handleReadRecipe}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                    currentPage === "/read"
                                        ? "bg-orange-200 text-black shadow-md"
                                        : "text-[#403F4C] hover:bg-orange-300/30"
                                }`}
                            >
                                <BookOpenText className="w-4 h-4" />
                                <span>Read Recipes</span>
                            </button>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
