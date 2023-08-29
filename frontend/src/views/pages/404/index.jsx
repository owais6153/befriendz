import Header from "components/shared/header";
import { Helmet } from "react-helmet";
import { siteTitle } from "shared/helper";
import ErrorLayout from "views/layouts/error/ErrorLayout";

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <title>Opps! Page not found | {siteTitle()}</title>
            </Helmet>
            <div style={{position: 'absolute', top: '0', left: 0, width: '100%'}}><Header /></div>           
            <ErrorLayout 
                title="Opps! Page not found."
                desc="We're sorry, but it seems that the page you are trying to access cannot be found at the provided URL."
                action="/"
                cta="Home"
            />
        </div>    
    )
}


export default Page404;
