import { useRef, useEffect } from "react";

function Contract({ title }) {
  const spanEle = useRef("");

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [title]);

  return (
    <code>
      {`contract Calendar {
  string title = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{title}</strong>
      </span>

      {`;

  function title() public view returns (string) {
    return title;
  }

  function updateTitle(string newTitle) public {
    title = newTitle;
  }
}`}
    </code>
  );
}

export default Contract;
