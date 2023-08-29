import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { REGX_CONSTANT } from "../../../../constants/regx.constant";
import { loginAction } from "../../../../redux/actions/authActions";
import useFormHandler from "../../../../shared/hooks/useFormHandler";
import EmptySpace from "../../shared/emptySpace";
import Button from "../../shared/form-elements/button";
import Input from "../../shared/form-elements/input";

const SignInForm = (props) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { handleChange, resetFormErrors } = useFormHandler(clearErrors);

  const submitHandler = (data) => {
    resetFormErrors();
    props.register(data).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mt-5 space-y-5">
      <div className="form-group mb-2">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="demaraigray@gmail.com"
          register={{
            ...register("email", {
              onChange: handleChange,
              required: "This field is required",
              pattern: {
                value: REGX_CONSTANT.EMAIL,
                message: "Invalid email address",
              },
            }),
          }}
          error={errors.email?.message || props.common.errors?.email}
        />
      </div>
      <div className="form-group password mb-3">
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter Your Password"
          register={{
            ...register("password", {
              onChange: handleChange,
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
              maxLength: {
                value: 50,
                message: "Password should be less then 50 characters",
              },
            }),
          }}
          error={errors.password?.message || props.common.errors?.password}
        />
      </div>
      <p className="text-end">
        <Link
          to="/recover-password"
          className="text-[14px] font-openSans_regular text-[#0493A3] hover:text-[#0493A3]"
        >
          Can’t remember password?
        </Link>
      </p>
      <EmptySpace height="200px" />
      <div className="form-group">
        <Button
          disabled={props.common.form_loder === 1}
          type="submit"
          className="btn bg-c_FD6769 btn-lg mb-4 w-100"
          text={"Continue"}
          isLoading={props.common.form_loder === 1}
        />

        <div className="mt-5 text-center">
          <span className="text-c_2A2A2A font-openSans_regular text-[14px]">
            New Here?{" "}
            <Link
              to="/create-account"
              className="text-c_0493A3 hover:text-c_0493A3 font-openSans_bold text-[16px]"
            >
              Create Account
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => ({
  common: state.common,
});
const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(loginAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
