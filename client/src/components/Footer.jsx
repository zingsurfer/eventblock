function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  return (
    <footer>
      <h2>More resources</h2>
      <div>
        <Link uri={"https://trufflesuite.com"} text={"Truffle"} />
        <Link uri={"https://reactjs.org"} text={"React"} />
        <Link uri={"https://soliditylang.org"} text={"Solidity"} />
        <Link uri={"https://ethereum.org"} text={"Ethereum"} />
        <Link uri={"https://www.flaticon.com/free-icon/calendar_1177433"} text={"Icon by Freepik - Flaticon"} />
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfAdW1uwsAnV8egL3LDhojewYzCKx1rS2LzyBqcEYfDR6E-rQ/viewform?embedded=true" width="640" height="542" frameborder="0" marginheight="0" marginwidth="0">Contact</iframe>
      </div>
    </footer >
  );
}

export default Footer;
