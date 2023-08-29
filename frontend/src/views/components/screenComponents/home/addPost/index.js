import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const AddPost = ({
  placeholder = "Let’s share what going on your mind...",
  user
}) => {
  const [title, setTitle] = useState();
  const navigate = useNavigate();
  const submitHandler = (e) =>{
    e.preventDefault()
    navigate('/add-post', { state: { title} })
  }
  const chnageHandler = (e) =>{
    setTitle(e.target.value)
  }
  return (
    <form onSubmit={submitHandler}>
    <div className="p-5 bg-white rounded-2xl flex w-full gap-5">
      <div className="w-full flex items-center gap-2">
        <div>
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={user?.profileImage}
            alt={user?.username}
          />
        </div>
        <div className="w-full">
          <input
            className="text-[#949494] bg-[#F5F5F5] px-3 h-[46px] w-full rounded outline-none"
            placeholder={placeholder}
            onChange={chnageHandler}
          />
        </div>
      </div>
      <div>
          <button
            type="submit"
            className="inline-flex justify-center items-center rounded-md bg-[#FD6769] text-[16px] font-openSans_bold text-white focus-visible:outline-none hover:brightness-110 min-w-[112px] min-h-[44px] space-x-2 "
          >
            <span className="text-[14px] font-openSans_semiBold text-white">
              Add Post
            </span>
          </button>
      </div>
    </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(AddPost);