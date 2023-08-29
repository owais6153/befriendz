import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import useFormHandler from "../../../../../shared/hooks/useFormHandler";
import { completeProfileAction } from "../../../../../redux/actions/authActions";
import Step4 from "./step-4";
import Step5 from "./step-5";
import Step6 from "./step-6";
import PrfileCompleted from "./profile-completed";

const CompleteProfileForm = (props) => {
  // Form Hndling
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    control,
    formState: { errors },
  } = useForm();
  const { handleChange, resetFormErrors } = useFormHandler(clearErrors);

  const submitHandler = (data) => {
    if (step < 6) {
      nextStep();
    } else {
      resetFormErrors();
      const formData = new FormData();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          console.log(key)
            if(key == 'profileImage' || key == 'image1' || key == 'image2' || key == 'image3'){
              if(data[key][0])
              formData.append(key, data[key][0]);
            }
            else {
              if(data[key]) formData.append(key, data[key]);
            }     
        }
      }
      props.completeProfile(formData).then(() => {
        setStep(() => 7);
      });
    }
  };


  // Steps Handling
  const [step, setStep] = useState(4);

  // Setps handling on error
  useEffect(() => {
    if (
      props.common.errors?.day ||
      props.common.errors?.month ||
      props.common.errors?.year ||
      props.common.errors?.dob ||
      props.common.errors?.gender ||
      props.common.errors?.occupation ||
      props.common.errors?.business_address ||
      props.common.errors?.phoneNumber
    ) {
      setStep(() => 4);      
    } else if (props.common.errors?.profileImage || props.common.errors?.image1 || props.common.errors?.image2 || props.common.errors?.image3) {
      setStep(() => 5);         
    } else if (props.common.errors?.about || props.common.errors?.interests) {
      setStep(() => 6);
    }
  }, [props.common.errors]);

  const nextStep = () => {
    if (step !== 6) {
      setStep((prevState) => prevState + 1);
    }
  };
  const prevStep = () => {
    if (step !== 4) {
      setStep((prevState) => prevState - 1);
    }
  };
  const changeStep = async () => {
    // Check for validation before changing step
    const isValid = await trigger();
    if (isValid) nextStep();
  };



  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Step4 currentStep={step} prevStep={prevStep} nextStep={nextStep} changeStep={changeStep} register={register} handleChange={handleChange} errors={errors} control={control} />

        <Step5 currentStep={step} prevStep={prevStep} nextStep={nextStep} changeStep={changeStep} register={register} handleChange={handleChange} errors={errors} control={control}/>

        <Step6 currentStep={step} prevStep={prevStep} nextStep={nextStep} changeStep={changeStep} register={register} handleChange={handleChange} errors={errors} control={control}/>

        <PrfileCompleted  currentStep={step}/>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  common: state.common,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  completeProfile: (data) => dispatch(completeProfileAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteProfileForm);
