import Card from  '../Componenet/Card.jsx'
import { useState, useEffect } from 'react';

export const Projetos = ({ className, ...props }) => {

  const [ repositories, setRepositories ] = useState([])

useEffect(() => {
    const buscarRepositorios = async () => {
        const response = await fetch('https://api.github.com/users/pedromaxis/repos')
        const data = await response.json()
        setRepositories(data)
        console.log(data.description)
    }
    buscarRepositorios()
   
}, []) 


  return (
    <>
   
   
        <header className="bg-[#064064] p-5 flex flex-row gap-5 items-center justify-center shrink-0 h-20 relative right-0 left-0 top-0 overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 6px 0px' }}>
          <div className="bg-[#ffc1be] rounded-[100px] shrink-0 w-10 h-10 relative"></div>
          <a href="/" className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] hidden md:flex text-[28px] leading-9 font-medium relative flex-1">Pedro Sales </a>
          <div className="bg-[#064064] flex flex-row gap-10 items-center justify-center shrink-0 relative">
            <a href="/" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Home </a>
            <a href="sobremim" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Sobre mim </a>
            <a href="projetos" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Projetos </a>
            <a href="#form" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Contato </a>
          </div>
        </header>
        <div className="flex mt-20 justify-center">
              <h1 className="fs-2 font-extrabold">MEUS PROJETOS</h1>
        </div>
<div className="flex px-40 flex-wrap flex-col mt-5">
  <div className="grid grid-cols-3 gap-10 items-center justify-center self-stretch shrink-0 relative">
          {
            //repositories.length > 0 ?(
              repositories.map((repo) =>

              
              <Card 
              key={repo.id}
              name={repo.name}
              description={repo.description}
              html_url={repo.html_url}

             
              
              />
              
              
              )
           } 
 
   </div>
</div>


<footer className="bg-[#064064] p-[60px] mt-5 flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="flex flex-row gap-[60px] items-center justify-center shrink-0 h-[100px] relative">
          <div className="text-[#ffdddc] text-center font-['Roboto-Regular',_sans-serif] text-xl leading-7 font-normal relative self-stretch w-[485px] flex items-center justify-center">
            © 2024 Pedro Lourenço Sales. All Rights Reserved.{" "}
          </div>
        </div>
      </footer>
    </>
  );
};
