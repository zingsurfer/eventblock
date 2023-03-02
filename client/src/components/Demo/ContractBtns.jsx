import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^[\w\-\s]+$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const title = async () => {
    const value = await contract.methods.title().call({ from: accounts[0] });
    setValue(value);
  };

  const updateTitle = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a title");
      return;
    }
    await contract.methods.updateTitle(inputValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={title}>
        title()
      </button>

      <div onClick={updateTitle} className="input-btn">
        updateTitle(<input
          type="text"
          placeholder="text"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
