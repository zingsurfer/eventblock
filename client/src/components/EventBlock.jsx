import { useState } from "react";
import Calendar from "./Calendar";

function EventBlock() {
  const [value, setValue] = useState("");

  return (
    <div>
      <Calendar setValue={setValue} value={value} />
    </div>
  );
}

export default EventBlock;
