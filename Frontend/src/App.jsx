import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-surface-925 min-h-screen pt-12">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
