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
      <div className="input-btn">
        <input
          type="text"
          placeholder=""
          value={inputValue}
          onChange={handleInputChange}
        />)
        <button onClick={updateTitle} id="edit-cal-title-btn">
          🎨 <span className="underline">Edit title</span>
        </button>
      </div>

    </div>
  );
}

export default ContractBtns;
