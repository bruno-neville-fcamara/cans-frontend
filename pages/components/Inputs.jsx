const Input = ({
    title,
    name_object,
    placeholder,
    type,
    onKeyUp,
    value
}) => {
    return(
        <>
            <label 
                htmlFor={name_object} 
                className="block text-sm font-medium text-gray-700"> 
                
                {title} 
            </label>
            
            <div className="mt-1 flex rounded-md shadow-sm">                                    
                <input 
                    type={type}
                    name={name_object}
                    id={name_object}
                    value={value}
                    required
                    className="block w-full flex-1 rounded border-gray-300 focus:border-green-500 
                                focus:ring-green-500 sm:text-sm" 
                    placeholder={placeholder}
                    onKeyUp={onKeyUp} />
            </div>
        </>
    )
}

export default Input