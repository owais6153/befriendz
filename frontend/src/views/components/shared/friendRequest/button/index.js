import { useState } from "react";
import { connect } from "react-redux";
import Button from "../../form-elements/button";
import { displayErrorsAction } from "redux/actions/commonActions";
import { displayMessageAction } from "redux/actions/commonActions";
import FriendsService from "services/friends.service";
import { Images } from "config/images";
import { FRIEND_STATUS } from "constants/user.constant";


const { checkIcon, xRedIcon } = Images;
const FrendRequestButton = ({ friendStatus, user = null, onFriendStatusChange = false, currentUser, displayError, displayMessage}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [response, setResponse] = useState(false);

    const sendFriendRequest = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        await FriendsService.sendFriendReuest(currentUser.token, user._id).then((response)=>{
          setIsRequestSent(true);
          displayMessage(response.data.message)
          setResponse(response.data.data.requestDetails)
        }, (error) => {
          displayError(error);
        }).catch(()=>{})
        setIsLoading(false)
    }

    const cancelFriendRequest = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      var data;
      if(!response)
        data = friendStatus;      
      else
        data = response
      
      FriendsService.cancelFriendRequest(currentUser.token, data._id).then((response)=>{
          displayMessage(response.data.message)
          if(onFriendStatusChange){
            onFriendStatusChange(response.data.data.friendRequest)
            setResponse(response.data.data.friendRequest)
            setIsRequestSent(false);
          }
      }, (error) => {
          displayError(error);
      }).catch(()=>{})
      setIsLoading(false);
    }

    const acceptFriendRequest = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      FriendsService.acceptFriendRequest(currentUser.token, friendStatus._id).then((response)=>{
        displayMessage(response.data.message)
        if(onFriendStatusChange){
          onFriendStatusChange(response.data.data.friendRequest)
        }
      }, (error) => {
          displayError(error);
      }).catch(()=>{})
      setIsLoading(false);
    }

    const rejectFriendRequest = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      FriendsService.rejectFriendRequest(currentUser.token, friendStatus._id).then((response)=>{
          displayMessage(response.data.message)
          if(onFriendStatusChange){
            onFriendStatusChange(response.data.data.friendRequest)
          }
      }, (error) => {
          displayError(error);
      }).catch(()=>{})
      setIsLoading(false)
    }

    const unfriend = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      var user_id = (currentUser._id !== friendStatus.from) ? friendStatus.from : friendStatus.to;
      if(user_id?._id) user_id = user_id._id
      FriendsService.unfriendUser(currentUser.token, user_id).then((response)=>{
          displayMessage(response.data.message)
          if(onFriendStatusChange){
            onFriendStatusChange(response.data.data.friendRequest)
          }
      }, (error) => {
          displayError(error);
      }).catch(()=>{})
      setIsLoading(false)
    }


    return (
    <>
        {(friendStatus.status !== FRIEND_STATUS.PENDING && friendStatus.status !== FRIEND_STATUS.ACCEPTED) && !isRequestSent && 
            // Send New Request
            <Button 
              isLoading={isLoading}
              disabled={isLoading}
              text={'Befriend'}
              onClick={sendFriendRequest}
              class="outline-none bg-[#0493A3] text-white text-[14px] font-openSans_semiBold flex justify-center items-center min-h-[36px] min-w-[147px] rounded-lg"
            />
        }
        {(friendStatus.status === FRIEND_STATUS.PENDING || isRequestSent) &&
          // Has Pending Request
          <>
            { (friendStatus.from === currentUser._id || isRequestSent) ? 
                // Request is sent by me
                <Button 
                  disabled={isLoading}
                  class="inline-flex rounded-md border-2 text-[14px] text-[#FD6769] border-c_FD6769  px-[20px] py-[5px] focus-visible:outline-none hover:brightness-110"
                  text={'Cancel Request'}
                  isLoading={isLoading}
                  onClick={cancelFriendRequest}
                />
              :
              // Request is recived                
              <div className="flex-shrink-0 space-x-3">
                <Button onClick={acceptFriendRequest} 
                  disabled={isLoading}
                  class="inline-flex rounded-md bg-c_30B52D border-2 border-c_30B52D p-[5px] focus-visible:outline-none hover:brightness-110">
                  <img src={checkIcon.default} alt="Accept"/>
                </Button>
                <Button  
                  disabled={isLoading}
                  onClick={rejectFriendRequest}
                  class="inline-flex rounded-md border-2 border-c_FD6769 p-[5px] focus-visible:outline-none hover:brightness-110">
                  <img src={xRedIcon.default} alt="Reject"/>
                </Button>
              </div>
            }
          </>
        }
        {friendStatus.status === FRIEND_STATUS.ACCEPTED &&
            // Already friend
            <Button 
              onClick={unfriend} 
              disabled={isLoading}
              isLoading={isLoading}
              class="inline-flex rounded-md bg-[#F5F5F5] py-[8px] px-[18px] text-[12px] font-openSans_semiBold text-[#515165] focus-visible:outline-none hover:brightness-95"
              text={'Unfriend'}
            />
        }
    </>)
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  displayError: (data) => dispatch(displayErrorsAction(data)),
  displayMessage: (data) => dispatch(displayMessageAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrendRequestButton);

