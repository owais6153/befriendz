import React, {useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Images } from "config/images";
import { USER_TYPE } from "constants/user.constant";
import { Link } from "react-router-dom";
import GroupService from "services/group.service"
import { displayErrorsAction } from "redux/actions/commonActions";
import { displayMessageAction } from "redux/actions/commonActions";

const { leaveIcon, shareIcon } = Images;
const ProfileSection = ({data, auth, displayError, displayMessage}) => {
  const [isJoinedByCurrentUser, setisJoinedByCurrentUser] = useState(data.group?.isJoinedByCurrentUser);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()


  const joinGroup  = useCallback(async (e) => {
    if(auth.isLoggedIn){
      e.preventDefault()
      setLoader(true)
      await GroupService.joinGroup(auth.user.token, data.group._id).then(()=>{
        setisJoinedByCurrentUser(true);
        displayMessage("Group Joined")
      },(error) => {
        displayError(error);
      }).catch(()=>{}) 
      setLoader(false)
    }
    else{
      navigate('/home')
    }
  }, [])
  
  const leaveGroup  = useCallback(async (e) => {
    if(auth.isLoggedIn){
      e.preventDefault()
      setLoader(true)
      await GroupService.leaveGroup(auth.user.token, data.group._id).then(()=>{
        setisJoinedByCurrentUser(false);
        displayMessage("Group Leaved")
      },(error) => {
        displayError(error);
      }).catch(()=>{}) 
      setLoader(false)
    }
    else{
      navigate('/home')
    }
  }, [])


  return (
    <div className="p-3 bg-white rounded-2xl mb-3">
      <div className="">
        <img
          className="rounded-2xl h-[174px] w-full object-cover"
          src={data.group.coverImage}
          alt={data.group.title}
        />
      </div>
      <div className="py-5">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <div>
              <img
                className="w-14  h-14 object-cover rounded-full"
                src={data.group.bannerImage}
                alt={data.group.title}
              />
            </div>
            <div>
              <div>
                <span className="text-[#3F4354] text-2xl font-openSans_regular leading-none">
                  {data.group.title}
                </span>
              </div>
              <div>
                <span className="text-[#97989D] text-[14px] font-openSans_semiBold  leading-none">
                  Created by{" "}
                  <Link to={`/profile/${data.group?.author?.username}`}><span className="text-[#3F4354]"> {data.group?.author?.type === USER_TYPE?.PERSONAL
                  ? `${data.group?.author?.first_name} ${data.group?.author?.last_name}`
                  : data.group?.author?.business_name}</span></Link>
                  </span>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="flex gap-2 md:flex-row flex-col">

              {auth?.user?._id !== data.group?.author?._id && isJoinedByCurrentUser ? 
              <>
              <button className="bg-[#0493A3] text-white text-[12px] font-openSans_medium flex items-center justify-center space-x-2 h-[40px] w-[84px] rounded" disabed={loader} isLoading={loader}>
                <div>
                  <img src={shareIcon.default} />
                </div>
                <div>
                  <span>Share</span>
                </div>
              </button>
              <button onClick={leaveGroup} className="bg-[#F5F5F5] text-[#515165] text-[12px] font-openSans_medium flex items-center justify-center space-x-2 h-[40px] w-[84px] rounded" disabed={loader} isLoading={loader}>
                <div>
                  <img src={leaveIcon.default} />
                </div>
                <div>
                  <span>Leave</span>
                </div>
              </button>
              </>
              : null}
              {!isJoinedByCurrentUser ? 
              <button onClick={joinGroup} className="bg-[#F5F5F5] text-[#515165] text-[12px] font-openSans_medium flex items-center justify-center space-x-2 h-[40px] w-[84px] rounded" disabed={loader} isLoading={loader}>

                <div>
                  <span>Join</span>
                </div>
              </button>
              : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  common: state.common,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  displayError: (data) => dispatch(displayErrorsAction(data)),
  displayMessage: (data) => dispatch(displayMessageAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);

