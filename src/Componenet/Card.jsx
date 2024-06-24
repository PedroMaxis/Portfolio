function Card({id, name, description, html_url})
{
    return(
        <>
        <div className="card w-100">
<img src="" className="card-img-top img-fluid sm" alt="..."/>
<div className="card-body">
  <a href='"{html_url}"' className="fs-4 text-bold">{name}</a>
  <p className="card-text">{description}</p>
</div>
      </div> 
        </>
    )
}
export default Card

 /*const card = ({id, name, description, html_url}) =>{
    return(
        <>
        
        <div className="card w-100">
<img src="" className="card-img-top img-fluid sm" alt="..."/>
<div className="card-body">
  <h1 className="fs-4">{name}</h1>
  <p className="card-text">{description}</p>
</div>
      </div> 
        
        
        </>


    )
 }*/

