import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Button from "../../shared/form-elements/button";
import Input from "../../shared/form-elements/input";
import useFormHandler from "../../../../shared/hooks/useFormHandler";
import { createPasswordAction } from "../../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import EmptySpace from "../../shared/emptySpace";
import { same } from "../../../../shared/validator";

const CreatePasswordForm = (props) => {
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
    props.createPassword(data).then(() => {
      navigate(props.navigate);
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mt-5 space-y-5">
      <div >
        <Input
          type="password"
          name="password"
          label="Create Password"

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
      <div className="form-group password">
        <Input
          type="password"
          label="Confirm Your Password"

          name="confirm_password"
          placeholder="Confirm Your Password"
          register={{
            ...register("confirm_password", {
              onChange: handleChange,
              required: "This field is required",
              validate: {
                sameAsPassword: (val) =>
                  same(val, watch("password"), "Your passwords do no match"),
              },
            }),
          }}
          error={
            errors.confirm_password?.message ||
            props.common.errors?.confirm_password
          }
        />
      </div>
      <EmptySpace height="200px" />
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
  isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = (dispatch) => ({
  createPassword: (data) => dispatch(createPasswordAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasswordForm);
