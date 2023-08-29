import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Textarea from "../../../shared/form-elements/textarea";
import CheckboxGroup from "../../../shared/form-elements/checkboxGroup";
import Button from "../../../shared/form-elements/button";
import InputError from "../../../shared/form-elements/inputError";
import TopicService from "../../../../../services/topic.service";
import { displayErrorsAction } from "../../../../../redux/actions/commonActions";

const Step6 = (props) => {
  const { currentStep, prevStep, register, handleChange, errors, control } =
    props;

  const [topics, setTopics] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchTopics() {
      setIsFetching(() => true);
      await TopicService.listAll(props.user.token)
        .then(
          (response) => {
            setTopics(response.data.data.topics);
            setIsFetching(() => false);
          },
          (error) => {
            props.displayError(error);
            setIsFetching(() => false);
          }
        )
        .catch(() => {});
    }
    if (currentStep === 6 && !topics) fetchTopics();
    return () => {
      setTopics(false);
    };
  }, [currentStep]);

  return (
    <div className={`step-form three ${currentStep !== 6 ? "hidden" : ""}`}>
      <a href="#!" onClick={prevStep} className="back">
        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
      </a>
      <div className="mt-5 flex flex-row items-center justify-between">
        <div>
          <span className="h2 text-dark">More Information</span>
          <p className="sm">
            To strengthen your profile tell us what you are like
          </p>
        </div>
        <h5 className="font-bold text-2xl">6 of 6</h5>
      </div>
      <div className="form-group">
        <Textarea
          label="Tell us about yourself"
          name="about"
          id="about"
          placeholder="Write something about you"
          register={{
            ...register("about", {
              onChange: handleChange,
              minLength: {
                value: 3,
                message: "About should be at least 3 characters long",
              },
              maxLength: {
                value: 220,
                message: "About should be less then 220 characters",
              },
            }),
          }}
          error={errors.about?.message || props.common.errors?.about}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="">What are your Interests</label>
        <div className="flex flex-row flex-wrap gap-3 max-h-52 h-full overflow-y-auto mt-3">
          {isFetching && <p>Fetching Topics...</p>}
          {topics && (
            <CheckboxGroup
              options={topics}
              control={control}
              name="interests"
              indexKey="_id"
              value="name"
            />
          )}
        </div>
        <InputError
          error={props.common.errors?.interests || errors.interests?.message}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Button
          disabled={props.common.form_loder === 1}
          type="submit"
          text="Complete Profile"
          isLoading={props.common.form_loder === 1}
        />

        <p className="sm mb-0 text-[#0493A3] text-center">
          <b>
            <button type="submit">Do It Later</button>
          </b>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  common: state.common,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  displayError: (data) => dispatch(displayErrorsAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step6);
