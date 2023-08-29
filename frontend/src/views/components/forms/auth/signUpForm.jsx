import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REGX_CONSTANT } from "../../../../constants/regx.constant";
import { USER_TYPE } from "../../../../constants/user.constant";
import { registerAction } from "../../../../redux/actions/authActions";
import useFormHandler from "../../../../shared/hooks/useFormHandler";
import Button from "../../shared/form-elements/button";
import Input from "../../shared/form-elements/input";

const SignUpForm = (props) => {
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
      navigate("/verify-email");
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mt-5 space-y-5">
      <Input
        type="hidden"
        name="type"
        value={props.type}
        register={{
          ...register("type"),
        }}
      />
      {props.type === USER_TYPE.PERSONAL && (
        <>
          <div className="form-group">
            <Input
              type="text"
              label="First Name"
              name="first_name"
              placeholder="Demarai"
              register={{
                ...register("first_name", {
                  onChange: handleChange,
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "First name should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "First name should be less then 20 characters",
                  },
                }),
              }}
              error={
                errors.first_name?.message || props.common.errors?.first_name
              }
            />
          </div>
          <div className="form-group">
            <Input
              label="Last Name"
              type="text"
              name="last_name"
              placeholder="Gray"
              register={{
                ...register("last_name", {
                  onChange: handleChange,
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Last name should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last name should be less then 20 characters",
                  },
                }),
              }}
              error={
                errors.last_name?.message || props.common.errors?.last_name
              }
            />
          </div>
        </>
      )}

      {props.type === USER_TYPE.BUSINESS && (
        <>
          <div className="form-group">
            <Input
              type="text"
              label="Full Business Name"
              name="business_name"
              placeholder="S7N D3SIGNS"
              register={{
                ...register("business_name", {
                  onChange: handleChange,
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message:
                      "Business Name should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Business Name should be less then 20 characters",
                  },
                }),
              }}
              error={
                errors.business_name?.message ||
                props.common.errors?.business_name
              }
            />
          </div>
          <div className="form-group">
            <Input
              label="Business Type"
              type="text"
              name="business_type"
              placeholder="Design"
              register={{
                ...register("business_type", {
                  onChange: handleChange,
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message:
                      "Business type should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Business type should be less then 20 characters",
                  },
                }),
              }}
              error={
                errors.business_type?.message ||
                props.common.errors?.business_type
              }
            />
          </div>
        </>
      )}

      <div className="form-group">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="demarai_gray"
          register={{
            ...register("username", {
              onChange: handleChange,
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Username should be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username should be less then 20 characters",
              },
              pattern: {
                value: REGX_CONSTANT.USERNAME,
                message:
                  "Username should only contain letters, numbers, hyphens, and underscores",
              },
            }),
          }}
          error={errors.username?.message || props.common.errors?.username}
        />
      </div>
      <div className="form-group">
        <Input
          label={props.type === USER_TYPE.PERSONAL ? "Email" : "Business Email"}
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
      <div>
        <span className="text-[12px] text-c_949494 font-openSans_regular mb-0">
          By clicking continue, You have accepted our Terms of Use and Policy
        </span>
      </div>

      <div className="form-group">
        <Button
          disabled={props.common.form_loder === 1}
          type="submit"
          text={"Create Account"}
          isLoading={props.common.form_loder === 1}
        />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  common: state.common,
});
const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
