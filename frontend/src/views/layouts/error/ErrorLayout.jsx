import { Images } from "config/images";
import { siteTitle } from "shared/helper";
const { authBrandLogo } = Images;
const ErrorLayout = ({title, desc, action, cta }) => {
    return (
      <div
        className={`min-h-screen w-full flex items-center justify-center py-16 }`}>
        <div className="grid grid-cols-5 w-full lg:max-w-4xl md:max-w-xl md:px-5 p-2">
          <div></div>
          <div className="lg:col-span-3 col-span-5">
            <div className="bg-white rounded-3xl lg:p-6 md:p-4 sm:p-3 p-2 sm:w-full ">

              <div className="p-4">
                <div className="text-center flex justify-center flex-column" style={{flexDirection:'column'}}>    
                    <div className="flex w-full justify-center mb-10">
                    <img src={authBrandLogo.default} alt={siteTitle()} />
                    </div>
                    {title && <h1 style={{lineHeight: '120%', marginBottom: '10px'}} className="text-black font-openSans_bold lg:text-[38px] mb-0 md:text-[36px] sm:text-[38px] text-[37px]">{title}</h1>}
                    {desc && <p className="lg:text-[16px] md:text-[16px] sm:text-[14px] text-[14px] text-c_949494 font-openSans_regular mb-0">{desc}</p>}                                        
                    {action && cta && <div className="w-full mt-10">
                        <a href={action} className="px-10 py-3 inline-block lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px] text-white bg-[#FD6769] rounded-full font-openSans_bold text-center hover:brightness-110 cursor-pointer">
                            {cta}
                        </a>
                    </div>}
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default ErrorLayout