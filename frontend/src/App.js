import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import { SocketProvider } from "context/socket.context";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
