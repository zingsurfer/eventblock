import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import EventBlock from "./components/EventBlock";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Toast />
          <EventBlock />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
