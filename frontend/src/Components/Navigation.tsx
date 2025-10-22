import {useLocation, useNavigate} from 'react-router-dom'
import {ChefHat, Home} from "lucide-react";

export function Navigation(){

    const navigate = useNavigate();

    const location = useLocation();

    const currentPage = location.pathname

    const handleHome = () =>{
        navigate("/");
    }

    return(
        <>
            <nav className={"border-b-2 border-black bg-blue-300 text-black shadow-md"} data-testid={"navbar"}>
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
                                        : "text-[#403F4C] hover:bg-[#EFB9D5]/30"
                                }`}
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </button>

                            <button
                                onClick={handleAddRecipe}

                            >

                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
