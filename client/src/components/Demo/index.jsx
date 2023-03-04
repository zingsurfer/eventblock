import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Calendar from "../Calendar";
import Toast from "./Toast";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("");

  return (
    <div className="demo">
      <Toast/>
      <Calendar setValue={setValue} value={value} />
    </div>
  );
}

export default Demo;
