import { Helmet } from "react-helmet";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import { siteTitle } from "../../../shared/helper";
import CompleteProfileForm from "../../components/forms/auth/completeProfileForm/index";
import ProfilePendingMiddleware from "../../../middleware/profilePendingMiddleware";
const CompleteProfile = () => {
  return (
    <AuthLayout className="sun-gradient">
      <Helmet>
        <title>Create Profile - {siteTitle()}</title>
      </Helmet>

      <CompleteProfileForm />
    </AuthLayout>
  );
};
export default ProfilePendingMiddleware(CompleteProfile);
