import AuthLayout from "../../layouts/Auth/AuthLayout";
import Message from "../../components/shared/message";
import { siteTitle } from "../../../shared/helper";
import { Helmet } from "react-helmet";
import GuestMiddleware from "../../../middleware/guestMiddleware";
const PasswordRecovered = () => {
  return (
    <AuthLayout className="purpleish-gradient">
      <Helmet>
        <title>Recover Password - {siteTitle()}</title>
      </Helmet>
      <div className="text-center">
        <Message
          title="Password Recovered"
          message="You can now sign in with your email address and the new password you have created"
          action="/sign-in"
        />
      </div>
    </AuthLayout>
  );
};
export default GuestMiddleware(PasswordRecovered);
