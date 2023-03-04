import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
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
    read();
  };

  return (
    <div className="btns">
      <div className="submit-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Calendar title"
            value={inputValue}
            onChange={handleInputChange}
            className="gradient-text"
          />
        </div>
        <button onClick={updateTitle} id="edit-cal-title-btn" className="btn">
          <span className="underline">Submit</span>
        </button>
      </div>
    </div>
  );
}

export default ContractBtns;
