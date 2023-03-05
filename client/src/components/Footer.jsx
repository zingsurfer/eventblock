import { useState } from "react";

function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  const [isContactingUs, setIsContactingUs] = useState(false)

  const toggleContactForm = () => {
    setIsContactingUs(!(isContactingUs))
  }

  return (
    <footer>
      <div className="socials">
        <span>•</span>
        <button id="contact-us">
          <p onClick={toggleContactForm}>Contact us</p>
        </button>
        <span>•</span>
        <a className="socials" href="https://github.com/Autumn-Martin/EventBlock" target="_blank" rel="noreferrer">
          <img alt="github logo" height="16px" src="https://i.imgur.com/kbxLJ9u.png" />
          <p>Find us on GitHub</p>
        </a>
      </div>
      <p>Built with ❤️ for <span className="gradient-text">EthDenver 2023</span> with:</p>
      <div className="links">
        <Link uri={"https://aurora.dev/"} text={"Aurora"} />
        <Link uri={"https://ethereum.org"} text={"Ethereum"} />
        <Link uri={"https://trufflesuite.com/ganache/"} text={"Ganache"} />
        <Link uri={"https://docs.openzeppelin.com/defender/guide-factory"} text={"OpenZeppelin"} />
        <Link uri={"https://www.infura.io/"} text={"Infura"} />
        <Link uri={"https://reactjs.org"} text={"React"} />
        <Link uri={"https://trufflesuite.com/boxes/react/"} text={"React Truffle Box"} />
        <Link uri={"https://soliditylang.org"} text={"Solidity"} />
        <Link uri={"https://trufflesuite.com"} text={"Truffle"} />
        <Link uri={"https://webpack.js.org"} text={"Webpack"} />
        <Link uri={"https://www.flaticon.com/free-icon/calendar_1177433"} text={"Icon by Freepik - Flaticon"} />
      </div>
      {
        isContactingUs ?
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfAdW1uwsAnV8egL3LDhojewYzCKx1rS2LzyBqcEYfDR6E-rQ/viewform?embedded=true" width="640" height="542" frameborder="0" marginheight="0" marginwidth="0">Contact</iframe> :
          null
      }
    </footer >
  );
}

export default Footer;
