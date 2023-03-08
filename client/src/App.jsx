import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import EventBlock from "./components/EventBlock";
import Demo from "./components/Demo";

function App() {
  const { ethereum } = window;
  const hasSupportedWallet = () => {
    return typeof ethereum !== 'undefined' && ethereum.isMetaMask
  }

  return (
    <>
      {
        hasSupportedWallet() ?
        <EthProvider>
          <div id="App">
            <div className="container">
              <Toast/>
              <EventBlock />
              <Footer />
            </div>
          </div>
        </EthProvider> :
        <div id="App">
          <div className="container">
              <p className="alert">
                <strong>Alert:</strong>
                Displaying demo. A wallet is needed to retrieve and save calendar data on chain.
              </p>
            <Demo />
          </div>
        </div>
      }
    </>
  );
}

export default App;
