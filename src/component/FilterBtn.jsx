import { X } from "lucide-react";

const FilterBtn = ({
    title,
    onClick,
    isActive,
    all 
}) => {


    const handleCrossClick = (e) => {
        e.stopPropagation();
        all();
    };


    return (
        <div>
            <button className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                font-medium text-sm transition-all duration-200
                ${isActive
                    ? 'bg-blue-100 outline-1 text-black dark:bg-sky-900 dark:text-slate-100'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-sky-600'
                }
            `} onClick={isActive ? all : onClick}>

                <span>{title}</span>
                {isActive && (
                    <span
                        onClick={handleCrossClick}
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer dark:bg-black/20 dark:hover:bg-black/30"
                    >
                        <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                )}
            </button>
        </div>
    )
}

export default FilterBtn
