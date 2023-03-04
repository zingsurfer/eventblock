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
      </div>
    </footer >
  );
}

export default Footer;
