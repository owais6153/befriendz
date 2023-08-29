import { Images } from "config/images";
import React, {useState} from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import GroupService from 'services/group.service';

const { newBlackIcon, starYellowIcon } = Images;
const Explore = ({group, auth, hasPinned}) => {
  const [isPin, setIsPin] = useState(hasPinned)
  const [isLoading, setLoading] = useState(false)


  const togglePin = async () => {
    await GroupService.pinGroup(auth.user.token, group._id).then((response)=>{
      setIsPin(response.data.data.hasPinned);


    }).catch((e)=>{
      toast.error('Some Thing Went Wrong');
    })
  }

  return (
    <div className="p-3 bg-white rounded-2xl mb-3">
      <div className="py-5 flex justify-between w-full items-center">
        <div>
          <span className="text-[#3F4354] text-[16px] font-openSans_semiBold">
            Explore
          </span>
        </div>
        <div className={`flex gap-2 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          <button className="min-h-[32px] min-w-[69px] bg-[#F7F7F7] rounded flex items-center justify-center gap-1 outline-none">
            <div>
              <img src={newBlackIcon.default} />
            </div>
            <div>
              <span className="text-[12px] text-[#3F4354] font-openSans_semiBold">
                New
              </span>
            </div>
          </button>
          <button className="min-h-[32px] min-w-[88px] bg-[#FFECE6] rounded flex items-center justify-center gap-1 outline-none">
            <div>
              <img src={starYellowIcon.default} />
            </div>
            <div>
              <span className="text-[12px] text-[#FF9900] font-openSans_semiBold">
                Popular
              </span>
            </div>
          </button>
          
          <button onClick={togglePin} className="min-h-[32px] min-w-[88px] bg-[#FFECE6] rounded flex items-center justify-center gap-1 outline-none">
            <div>
              <span className="text-[12px] text-[#FF9900] font-openSans_semiBold">
                { isPin ? 'Unpin' : 'Pin'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Explore);
