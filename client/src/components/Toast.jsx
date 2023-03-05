import useEth from "../contexts/EthContext/useEth";

function Toast() {
  const { state } = useEth();
  const alerts = {
    "noArtifact": "Cannot find <strong>Calendar</strong> contract artifact.",
    "wrongNetwork": "MetaMask is not connected to a network that has been deployed to."
  }
  let alert = ""
  if (!state.contract) {
    alert = alerts.wrongNetwork
  } else if (!state.artifact) {
    alert = alerts.noArtifact
  }

  return (
    <>
      {
        alert ? <p className = "alert">{ alert }</p> : null
      }
    </>
  );
}

export default Toast;
