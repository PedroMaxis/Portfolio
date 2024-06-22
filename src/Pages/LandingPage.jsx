export const LandingPage = ({ className, ...props }) => {
  return (
    <>
    
    <header className="bg-[#064064] p-5 flex flex-row gap-5 items-center justify-center shrink-0 h-20 relative right-0 left-0 top-0 overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 6px 0px' }}>
          <div className="bg-[#ffc1be] rounded-[100px] shrink-0 w-10 h-10 relative"></div>
          <h1 className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] hidden md:flex text-[28px] leading-9 font-medium relative flex-1">Pedro Sales </h1>
          <div className="bg-[#064064] flex flex-row gap-10 items-center justify-center shrink-0 relative">
            <a href="/" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Home </a>
            <a href="sobremim" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Sobre mim </a>
            <a href="projetos" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Projetos </a>
            <a href="#form" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Contato </a>
          </div>
        </header>
      <div className="pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="flex flex-col gap-6 items-center justify-start flex-1 relative">
          <div className="text-[#000000] text-center font-['Roboto-Bold',_sans-serif] text-[40px] leading-[48px] font-bold relative w-[520px]">
            Bem vindo ao Portfolio{" "}
          </div>
          <div className="text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative w-[520px]">
            Veja Meus Ultimos Projetos e Habilidades{" "}
          </div>
        </div>
      </div>
      <div className="bg-[#064064] pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-10 items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="bg-[rgba(217,217,217,0.50)] rounded-[50px] shrink-0 w-[100px] h-[100px] relative overflow-hidden"><img src="./fotoPerfil.jpg" alt="" srcset="" /></div>
        <div className="flex flex-col gap-3 items-center justify-start flex-1 relative">
          <div className="text-[#ffdddc] text-left font-['Roboto-Bold',_sans-serif] text-2xl leading-8 font-bold relative self-stretch">
            Pedro Lourenço Sales{" "}
          </div>
          <div className="flex flex-wrap gap-1.5 items-center justify-start self-stretch shrink-0 relative overflow-hidden">
            <div className="bg-[rgba(217,217,217,0.50)] rounded-sm border-solid border-[rgba(0,0,0,0.10)] border-[0.5px] pt-0.5 pr-1 pb-0.5 pl-1 flex flex-row gap-0.5 items-center justify-center shrink-0 relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal relative">
                Web Developer{" "}
              </div>
            </div>
            <div className="bg-[rgba(217,217,217,0.50)] rounded-sm border-solid border-[rgba(0,0,0,0.10)] border-[0.5px] pt-0.5 pr-1 pb-0.5 pl-1 flex flex-row gap-0.5 items-center justify-center shrink-0 relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal relative">
                Back-end Developer{" "}
              </div>
            </div>
            <div className="bg-[rgba(217,217,217,0.50)] rounded-sm border-solid border-[rgba(0,0,0,0.10)] border-[0.5px] pt-0.5 pr-1 pb-0.5 pl-1 flex flex-row gap-0.5 items-center justify-center shrink-0 relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal relative">
                UI/UX Designer{" "}
              </div>
            </div>
          </div>
          <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative self-stretch">
            Apaixonado por Tecnologia, Programação, WebDesign e Inovação{" "}
          </div>
        </div>
        <a href="#form" className="flex flex-col gap-3 items-start justify-start shrink-0 relative overflow-hidden">
          <div className="bg-[#d4aeac] rounded-lg p-3 flex flex-col gap-0 items-center justify-center shrink-0 w-40 relative">
            <div className="text-[#ffffff] text-left font-['Roboto-Medium',_sans-serif] text-base leading-6 font-medium relative">
              Contato{" "}
            </div>
          </div>
        </a>
      </div>
      <div className="pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-col gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative">
          <div className="flex flex-col gap-6 items-start justify-start flex-1 relative">
            <div className="text-[#000000] text-left font-['Roboto-Bold',_sans-serif] text-[40px] leading-[48px] font-bold relative self-stretch">
              Projetos em Destaque{" "}
            </div>
            <div className="text-[#000000] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative self-stretch">
              Veja meus trabalhos principais{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-10 items-center justify-center self-stretch shrink-0 relative">
        <div className="card w-100">
  <img src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top img-fluid sm" alt="..."/>
  <div className="card-body">
    <h1 className="fs-4">Titulo</h1>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div className="card w-100">
  <img src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top img-fluid sm" alt="..."/>
  <div className="card-body">
  <h1 className="fs-4">Titulo</h1>

    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div className="card w-100">
  <img src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top img-fluid sm" alt="..."/>
  <div className="card-body">
  <h1 className="fs-4">Titulo</h1>

    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
        </div>
      </div>
      <div id="form" className="bg-[#064064] pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="flex flex-col gap-6 items-start justify-start flex-1 relative">
          <div className="text-[#ffdddc] text-left font-['Roboto-Bold',_sans-serif] text-[40px] leading-[48px] font-bold relative self-stretch">
            Entre em Contato{" "}
          </div>
          <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative self-stretch">
            Me envie uma mensagem ou pergunte sobre um projeto.{" "}
          </div>
        </div>
        <div className="flex flex-col gap-10 items-start justify-center flex-1 relative">
          <div className="flex flex-row gap-20 items-start justify-start self-stretch shrink-0 relative">
            <div className="flex flex-col gap-1 items-start justify-center shrink-0 w-[520px] relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch">
                Nome{" "}
              </div>
              <input placeholder="Digite seu Nome" className="bg-[#ffffff] rounded-md border-solid border-[rgba(0,0,0,0.10)] border pt-2 pr-3 pb-2 pl-3 flex flex-row gap-1 items-center justify-start self-stretch shrink-0 relative" type="text" />
            </div>
          </div>
          <div className="flex flex-row gap-20 items-start justify-start self-stretch shrink-0 relative">
            <div className="flex flex-col gap-1 items-start justify-center shrink-0 w-[520px] relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch">
                Email{" "}
              </div>
              <input placeholder="Digite seu Email" className="bg-[#ffffff] rounded-md border-solid border-[rgba(0,0,0,0.10)] border pt-2 pr-3 pb-2 pl-3 flex flex-row gap-1 items-center justify-start self-stretch shrink-0 relative" type="text" />
            </div>
          </div>
          <div className="flex flex-row gap-20 items-start justify-start self-stretch shrink-0 relative">
            <div className="flex flex-col gap-1 items-start justify-center shrink-0 w-[520px] relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch">
                Mensagem{" "}
              </div>
              <textarea placeholder="Digite sua Mensagem" className="bg-[#ffffff] rounded-md border-solid border-[rgba(0,0,0,0.10)] border pt-2 pr-3 pb-2 pl-3 flex flex-row gap-1 items-center justify-start self-stretch shrink-0 relative" type="text" />
            </div>
          </div>
          <div className="flex flex-row gap-3 items-start justify-start shrink-0 relative overflow-hidden">
            <div className="rounded-lg border-solid border-[#ffdddc] border p-3 flex flex-col gap-0 items-center justify-center shrink-0 w-60 relative">
              <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-base leading-6 font-medium relative">
                Limpar Formulario{" "}
              </div>
            </div>
            <div className="bg-[#d4aeac] rounded-lg p-3 flex flex-col gap-0 items-center justify-center shrink-0 w-60 relative">
              <div className="text-[#ffffff] text-left font-['Roboto-Medium',_sans-serif] text-base leading-6 font-medium relative">
                Mandar Mensagem{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
      <div className=" z-50 text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal absolute right-4 left-4 top-[calc(50%_-_8px)] h-4 flex items-center justify-center "><p className=" text-[#ffdddc] text-lg">Vamos Colaborar e fazer um projeto Juntos</p></div>
        <div className="pt-1 pb-1 flex flex-row gap-0 items-start justify-start flex-1 h-[300px] relative overflow-hidden">
          <div className="bg-[rgba(217,217,217,0.50)] rounded-md self-stretch flex-1 relative">
          <img className="xsm:h-60 h-[700px] flex-1 w-full rounded-md relative" src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" />
          </div>
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
