import React from "react";
import ErrorLayout from "views/layouts/error/ErrorLayout";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false,  };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }


  componentDidCatch(error, errorInfo) {
  }
  getError = () => {
    return this.state.error;
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
          <div>
            <ErrorLayout 
                title={ "Opps! Some thing went wrong." }
                desc="We apologize for the inconvenience, Our team is working to resolve the issue as soon as possible. Please try again later, or contact our support team if the issue persists. Thank you for your patience."
                action="/"
                cta="Home"
            />
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
