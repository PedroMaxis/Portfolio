
import FadeInView from '../Component/FadeIn'

export const AboutUs = () => {
    return (
        <>
        
        <header className="bg-[#064064] p-5 flex flex-row gap-5 items-center justify-center shrink-0 h-20 relative right-0 left-0 top-0 overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 6px 0px' }}>
          <div className="bg-[#ffc1be] rounded-[100px] shrink-0 w-10 h-10 relative"></div>
          <a href="/" className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] hidden md:flex text-[28px] leading-9 font-medium relative flex-1">Pedro Sales </a>
          <div className="bg-[#064064] flex flex-row gap-10 items-center justify-center shrink-0 relative">
            <a href="/" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Home </a>
            <a href="sobremim" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Sobre mim </a>
            <a href="projetos" className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">Projetos </a>
          </div>
        </header>
            <FadeInView>
            <div className="text-center p-[150px] justify-center flex-1 padd font-extrabold relative text-[38px]">
                <h1>SOBRE MIM</h1>
            </div>

        <div className="bg-[#064064] pt-14 pr-1.5 pb-14 pl-1.5 flex flex-row gap-[80px] items-center justify-center flex-wrap relative overflow-hidden">
            <img src="./fotoPerfil.jpg" className="bg-[#d9d9d9] justify-center rounded-full md:w-[27rem] md:h-[27rem] w-96 h-96"/>
              <div className="text-[#ffdddc] text-center font-roboto text-5xl leading-[46px] font-normal relative w-[769px] h-[684px]" style={{ letterSpacing: "0.06em" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus metus
        at sem aliquet elementum. Morbi massa augue, gravida et diam quis, ornare
        gravida dui. Vestibulum rutrum sollicitudin urna, vitae vulputate elit
        aliquet non. Nullam cursus sit amet tellus sed malesuada. Aliquam egestas
        interdum massa nec auctor. Cras iaculis auctor ex et venenatis. Vivamus
        cursus vitae nunc porta finibus.
      </div>
    </div>
    <div className="flex flex-row gap-[90px] items-center justify-center h-[346px] overflow-hidden">
     <a href="https://www.linkedin.com/in/pedrolsales/"><img className="shrink-0 w-12 h-12 relative overflow-visible" src="./Linkedin.png"/></a>
  <a href="https://github.com/PedroMaxis"><img className="shrink-0 w-12 h-12 relative overflow-visible" src="./gitHub.png"/></a>
  <a href="https://www.figma.com/@pedro11sales14"><img className="shrink-0 w-12 h-12 relative overflow-visible" src="./Figma.png"/></a>
</div>
</FadeInView>
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

export default AboutUs