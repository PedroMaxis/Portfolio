export const Prototype = ({ className, ...props }) => {
  return (
    <div
      className={
        "bg-[#ffffff] pt-20 flex flex-col gap-0 items-center justify-start relative " +
        className
      }
    >
      <div
        className="bg-[#064064] p-5 flex flex-row gap-5 items-center justify-center shrink-0 h-20 absolute right-0 left-0 top-0 overflow-hidden"
        style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.12)" }}
      >
        <div className="bg-[#ffc1be] rounded-[100px] shrink-0 w-10 h-10 relative"></div>
        <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-[28px] leading-9 font-medium relative flex-1">
          Pedro Sales{" "}
        </div>
        <div className="bg-[#064064] flex flex-row gap-10 items-center justify-center shrink-0 relative">
          <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">
            Home{" "}
          </div>
          <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">
            Sobre mim{" "}
          </div>
          <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">
            Projetos{" "}
          </div>
          <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative">
            Contato{" "}
          </div>
        </div>
      </div>
      <div className="pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="flex flex-col gap-6 items-center justify-start flex-1 relative">
          <div className="text-[#000000] text-center font-['Roboto-Bold',_sans-serif] text-[40px] leading-[48px] font-bold relative w-[520px]">
            Welcome to My Portfolio{" "}
          </div>
          <div className="text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative w-[520px]">
            Explore my latest projects and skills{" "}
          </div>
        </div>
        <img
          className="shrink-0 h-0 absolute right-0 left-0 bottom-0 overflow-visible"
          src="vector-2000.svg"
        />
      </div>
      <div className="bg-[#064064] pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-10 items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="bg-[rgba(217,217,217,0.50)] rounded-[50px] shrink-0 w-[100px] h-[100px] relative overflow-hidden"></div>
        <div className="flex flex-col gap-3 items-center justify-start flex-1 relative">
          <div className="text-[#ffdddc] text-left font-['Roboto-Bold',_sans-serif] text-2xl leading-8 font-bold relative self-stretch">
            Pedro Lourenço Sales{" "}
          </div>
          <div className="flex flex-row gap-1.5 items-center justify-start self-stretch shrink-0 relative overflow-hidden">
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
        <div className="flex flex-col gap-3 items-start justify-start shrink-0 relative overflow-hidden">
          <div className="bg-[#d4aeac] rounded-lg p-3 flex flex-col gap-0 items-center justify-center shrink-0 w-40 relative">
            <div className="text-[#ffffff] text-left font-['Roboto-Medium',_sans-serif] text-base leading-6 font-medium relative">
              Contato{" "}
            </div>
          </div>
        </div>
        <img
          className="shrink-0 h-0 absolute right-0 left-0 bottom-0 overflow-visible"
          src="vector-2001.svg"
        />
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
          <div className="flex flex-row gap-0 items-start justify-start shrink-0 w-[180px] h-[180px] relative overflow-hidden">
            <div className="bg-[rgba(217,217,217,0.50)] self-stretch flex-1 relative"></div>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center justify-center self-stretch shrink-0 relative">
          <div className="flex flex-row gap-10 items-start justify-start self-stretch shrink-0 relative">
            <div className="rounded-md border-solid border-[rgba(0,0,0,0.10)] border flex flex-col gap-0 items-center justify-start flex-1 relative overflow-hidden">
              <div className="flex flex-row gap-0 items-start justify-start self-stretch shrink-0 h-[340px] relative overflow-hidden">
                <div className="bg-[rgba(217,217,217,0.50)] self-stretch flex-1 relative">
                  <div className="text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal absolute right-4 left-4 top-[calc(50%_-_8px)] h-4 flex items-center justify-center">
                    Project 1{" "}
                  </div>
                  <div className="bg-[rgba(0,0,0,0.05)] rounded-tl-md rounded-br-md pt-1 pr-2 pb-1 pl-2 flex flex-col gap-0 items-center justify-center absolute left-0 top-0">
                    <div className="text-[#000000] text-left font-['Roboto-Medium',_sans-serif] text-xs leading-4 font-medium relative">
                      New Release{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#064064] p-3 flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative self-stretch">
                  Website A{" "}
                </div>
                <div
                  className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-xl leading-7 font-medium relative self-stretch h-7 overflow-hidden"
                  style={{ textOverflow: "ellipsis" }}
                >
                  Technology Used: HTML, CSS, JavaScript{" "}
                </div>
              </div>
            </div>
            <div className="rounded-md border-solid border-[rgba(0,0,0,0.10)] border flex flex-col gap-0 items-center justify-start flex-1 relative overflow-hidden">
              <div className="flex flex-row gap-0 items-start justify-start self-stretch shrink-0 h-[340px] relative overflow-hidden">
                <div className="bg-[rgba(217,217,217,0.50)] self-stretch flex-1 relative">
                  <div className="text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal absolute right-4 left-4 top-[calc(50%_-_8px)] h-4 flex items-center justify-center">
                    Project 2{" "}
                  </div>
                  <div className="bg-[rgba(0,0,0,0.05)] rounded-tl-md rounded-br-md pt-1 pr-2 pb-1 pl-2 flex flex-col gap-0 items-center justify-center absolute left-0 top-0">
                    <div className="text-[#000000] text-left font-['Roboto-Medium',_sans-serif] text-xs leading-4 font-medium relative">
                      Featured{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#064064] p-3 flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative self-stretch">
                  App B{" "}
                </div>
                <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-xl leading-7 font-medium relative self-stretch">
                  Technology Used: React Native{" "}
                </div>
              </div>
            </div>
            <div className="rounded-md border-solid border-[rgba(0,0,0,0.10)] border flex flex-col gap-0 items-center justify-start flex-1 relative overflow-hidden">
              <div className="flex flex-row gap-0 items-start justify-start self-stretch shrink-0 h-[340px] relative overflow-hidden">
                <div className="bg-[rgba(217,217,217,0.50)] self-stretch flex-1 relative">
                  <div className="text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal absolute right-4 left-4 top-[calc(50%_-_8px)] h-4 flex items-center justify-center">
                    Project 3{" "}
                  </div>
                  <div className="bg-[rgba(0,0,0,0.05)] rounded-tl-md rounded-br-md pt-1 pr-2 pb-1 pl-2 flex flex-col gap-0 items-center justify-center absolute left-0 top-0">
                    <div className="text-[#000000] text-left font-['Roboto-Medium',_sans-serif] text-xs leading-4 font-medium relative">
                      Featured{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#064064] p-3 flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-[#ffdddc] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal relative self-stretch">
                  Design C{" "}
                </div>
                <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-xl leading-7 font-medium relative self-stretch">
                  Tools Used: Figma, Sketch{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="shrink-0 h-0 absolute right-0 left-0 bottom-0 overflow-visible"
          src="vector-2002.svg"
        />
      </div>
      <div className="bg-[#064064] pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
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
              <div className="bg-[#ffffff] rounded-md border-solid border-[rgba(0,0,0,0.10)] border pt-2 pr-3 pb-2 pl-3 flex flex-row gap-1 items-center justify-start self-stretch shrink-0 relative">
                <div
                  className="text-[rgba(0,0,0,0.50)] text-left font-['Roboto-Regular',_sans-serif] text-sm leading-5 font-normal relative flex-1 h-5 overflow-hidden"
                  style={{ textOverflow: "ellipsis" }}
                >
                  Enter your name{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-20 items-start justify-start self-stretch shrink-0 relative">
            <div className="flex flex-col gap-1 items-start justify-center shrink-0 w-[520px] relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch">
                Email{" "}
              </div>
              <div className="bg-[#ffffff] rounded-md border-solid border-[rgba(0,0,0,0.10)] border pt-2 pr-3 pb-2 pl-3 flex flex-row gap-1 items-center justify-start self-stretch shrink-0 relative">
                <div
                  className="text-[rgba(0,0,0,0.50)] text-left font-['Roboto-Regular',_sans-serif] text-sm leading-5 font-normal relative flex-1 h-5 overflow-hidden"
                  style={{ textOverflow: "ellipsis" }}
                >
                  Enter your email{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-20 items-start justify-start self-stretch shrink-0 relative">
            <div className="flex flex-col gap-1 items-start justify-center shrink-0 w-[520px] relative overflow-hidden">
              <div className="text-[#ffdddc] text-left font-['Roboto-Medium',_sans-serif] text-sm leading-5 font-medium relative self-stretch">
                Mensagem{" "}
              </div>
              <div className="bg-[#ffffff] rounded-md border-solid border-[rgba(0,0,0,0.10)] border pt-2 pr-3 pb-2 pl-3 flex flex-row gap-1 items-center justify-start self-stretch shrink-0 relative">
                <div
                  className="text-[rgba(0,0,0,0.50)] text-left font-['Roboto-Regular',_sans-serif] text-sm leading-5 font-normal relative flex-1 h-5 overflow-hidden"
                  style={{ textOverflow: "ellipsis" }}
                >
                  Enter your message{" "}
                </div>
              </div>
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
        <img
          className="shrink-0 h-0 absolute right-0 left-0 bottom-0 overflow-visible"
          src="vector-2003.svg"
        />
      </div>
      <div className="pt-[60px] pr-[170px] pb-[60px] pl-[170px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="pt-1 pb-1 flex flex-row gap-0 items-start justify-start flex-1 h-[300px] relative overflow-hidden">
          <div className="bg-[rgba(217,217,217,0.50)] rounded-md self-stretch flex-1 relative">
            <div className="text-[#000000] text-center font-['Roboto-Regular',_sans-serif] text-xs leading-4 font-normal absolute right-4 left-4 top-[calc(50%_-_8px)] h-4 flex items-center justify-center">
              <span>
                <span className="title-6-span4">Vamos colabora</span>
                <span className="title-6-span5">r e</span>
                <span className="title-6-span6">
                  criar algo incrivel Juntos
                </span>
              </span>{" "}
            </div>
            <div className="flex flex-row gap-1 items-center justify-center absolute left-[calc(50%_-_22px)] bottom-2">
              <div className="bg-[#ffffff] rounded-[100px] shrink-0 w-5 h-1 relative"></div>
              <div className="bg-[rgba(0,0,0,0.30)] rounded-[100px] shrink-0 w-1 h-1 relative"></div>
              <div className="bg-[rgba(0,0,0,0.30)] rounded-[100px] shrink-0 w-1 h-1 relative"></div>
              <div className="bg-[rgba(0,0,0,0.30)] rounded-[100px] shrink-0 w-1 h-1 relative"></div>
            </div>
          </div>
        </div>
        <img
          className="shrink-0 h-0 absolute right-0 left-0 bottom-0 overflow-visible"
          src="vector-2004.svg"
        />
      </div>
      <div className="bg-[#064064] p-[60px] flex flex-row gap-[60px] items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        <div className="flex flex-row gap-[60px] items-center justify-center shrink-0 h-[100px] relative">
          <div className="text-[#ffdddc] text-center font-['Roboto-Regular',_sans-serif] text-xl leading-7 font-normal relative self-stretch w-[485px] flex items-center justify-center">
            © 2024 Pedro Lourenço Sales. All Rights Reserved.{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
