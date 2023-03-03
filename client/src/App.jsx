import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import Footer from "./components/Footer";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
