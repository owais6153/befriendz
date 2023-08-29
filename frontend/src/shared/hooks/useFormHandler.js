import { useDispatch } from "react-redux";
import { resetFormErrorsAction } from "../../redux/actions/commonActions";

function useFormHandler(clearErrors) {
  const dispatch = useDispatch();
  const resetFormErrors = () => {
    dispatch(resetFormErrorsAction());
    clearErrors();
  };
  const handleChange = () => {
    resetFormErrors();
  };

  return { handleChange, resetFormErrors };
}

export default useFormHandler;
