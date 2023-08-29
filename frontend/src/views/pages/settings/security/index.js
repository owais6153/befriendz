import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EmptySpace from "views/components/shared/emptySpace";
import { useForm } from "react-hook-form";
import Button from "views/components/shared/form-elements/button";
import Input from "views/components/shared/form-elements/input";
import useFormHandler from "../../../../shared/hooks/useFormHandler";
import { same } from "../../../../shared/validator";
import ProtectedMiddleware from "middleware/protectedMiddleware";
import { updatePasswordAction } from "redux/actions/userAction";

const Security = (props) => {
  const {
    register,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { handleChange, resetFormErrors } = useFormHandler(clearErrors);
  const submitHandler = (data) => {
    resetFormErrors();
    props.updatePassword(data).then(() => {
      
    });
  };
  return (
    <Fragment>
      <Fragment>
        <div className="py-4">
          <div className="mx-auto xl:grid xl:grid-cols-7 px-3 sm:px-6 lg:gap-8 lg:px-8">
            <div className="col-span-5">
              <div>
                <div className="xl:space-y-0 space-y-10">
                  <aside className="xl:hidden"></aside>
                  <div className="bg-white px-4 rounded-2xl min-h-screen">
                    <div className="pb-5 pt-10 flex w-full justify-between items-center flex-wrap">
                      <div>
                        <span className="text-[#2A2A2A] font-openSans_bold text-[24px]">
                          Security
                        </span>
                      </div>
                    </div>
                    <div className="h-1 bg-c_FD6769 w-full rounded-full"></div>
                    <div className="py-10 space-y-5">
                      <div>
                        <span className="text-[#515165] lg:text-[24px] md:text-[23px] sm:text-[22px] text-[21px] font-openSans_bold ">
                          Change Password
                        </span>
                      </div>
                      <div>
                        <div className="grid grid-cols-7">
                          <div></div>
                          <div className="lg:col-span-5 col-span-full">
                            <form onSubmit={handleSubmit(submitHandler)}  className="mt-5 space-y-5">
                              <div>
                                <Input
                                  type="password"
                                  name="password"
                                  label="Current Password"
                                  placeholder="Enter Your Current Password"
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
                              <div>
                                <Input
                                  type="password"
                                  name="new_password"
                                  label="New Password"
                                  placeholder="Enter Your New Password"
                                  register={{
                                    ...register("new_password", {
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
                              <div>
                                <Input
                                  type="password"
                                  label="Confirm Password"
                                  name="confirm_password"
                                  placeholder="Confirm Your Password"
                                  register={{
                                    ...register("confirm_password", {
                                      onChange: handleChange,
                                      required: "This field is required",
                                      validate: {
                                        sameAsPassword: (val) =>
                                          same(val, watch("new_password"), "Your passwords do no match"),
                                      },
                                    }),
                                  }}
                                  error={
                                    errors.confirm_password?.message ||
                                    props.common.errors?.confirm_password
                                  }
                                />
                              </div>
                              <EmptySpace height="40px" />
                              <div>
                                <Button
                                  type="submit"
                                  text={"Update Password"}
                                  disabled={props.common.form_loder === 1}
                                  isLoading={props.common.form_loder === 1}
                                />
                              </div>
                            </form>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <aside className="hidden xl:block col-span-2"></aside>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  common: state.common,
});
const mapDispatchToProps = (dispatch) => ({
  updatePassword: (data) => dispatch(updatePasswordAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedMiddleware(Security));
