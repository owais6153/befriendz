import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Button from "../../shared/form-elements/button";
import Input from "../../shared/form-elements/input";
import useFormHandler from "../../../../shared/hooks/useFormHandler";
import { recoverPasswordAction } from "../../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import EmptySpace from "../../shared/emptySpace";
import { REGX_CONSTANT } from "../../../../constants/regx.constant";

const RecoverPasswordForm = (props) => {
  const {
    register,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { handleChange, resetFormErrors } = useFormHandler(clearErrors);

  const submitHandler = (data) => {
    resetFormErrors();
    props.recoverPassword(data).then(() => {
      navigate("/recover-password/verify-email");
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-group">
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter Your Email"
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

      <EmptySpace height="150px" />
      <Button
        disabled={props.common.form_loder === 1}
        type="submit"
        text={"Continue"}
        isLoading={props.common.form_loder === 1}
      />
      <EmptySpace height="40px" />
    </form>
  );
};
const mapStateToProps = (state) => ({
  common: state.common,
});
const mapDispatchToProps = (dispatch) => ({
  recoverPassword: (data) => dispatch(recoverPasswordAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordForm);
