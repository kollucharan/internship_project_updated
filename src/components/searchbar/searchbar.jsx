import { useState } from "react"


export default  function Searchbar({setSubmittedValue}){
    const [searchTerm, setSearchTerm] = useState(''); // Holds the input value
   
    function handleInputChange(e){
        setSearchTerm(e.target.value)  
    }

 function handlebuttonclick(){
    setSubmittedValue(searchTerm);
    
 }

    return (
        <div>
     <input type="text"  placeholder="Search by product name"   onChange={handleInputChange}/>
      <button onClick={()=>{handlebuttonclick()}}>Search</button>
        </div>
    )

}

   