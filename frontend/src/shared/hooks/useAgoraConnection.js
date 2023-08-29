import AC from "agora-chat";
import { useSelector } from "react-redux";

function useAgoraConnection(user = 'USER1', agoraToken) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    if(isLoggedIn){
        const conn = new AC.connection({
            appKey: process.env.REACT_APP_AGORA_APP_KEY,    
        });
        const options = {
            user,
            agoraToken,
        };
        conn.open(options);

        return {conn}
    }
}

export default useAgoraConnection;
