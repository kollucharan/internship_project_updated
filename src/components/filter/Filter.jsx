

export default function Filter(){

    return (
        <div>
        
       <form action="">
    <div style={{display:"flex"}}> 
        <input type="checkbox" name="Electronics" id="Electronics" />
    <label htmlFor="Electronics">Electronics</label>
      </div>  
      <div style={{display:"flex"}}> 
        <input type="checkbox" name="Accessories" id="Accessories" />
    <label htmlFor="Accessories">Accessories</label>

      </div>
      <div style={{display:"flex"}}> 
        <input type="checkbox" name="Home Applicances" id="Home Applicances" />
    <label htmlFor="Home Applicances">Home Applicances</label>
    
      </div>

       </form>

        </div>
    )
}