function Welcome() {
  return (
    <div className="welcome">
      <img className="logo" src="logos/logo-square.png" alt="logo" />
      <h1>👋 Welcome to the <span className="gradient-text">Truffle</span> + React Box!</h1>
      <p>
        This is everything you need to start using Truffle to write,
        compile, test, and deploy smart contracts, and interact with
        them from a React app.
      </p>
      <button class="gradient-background">Button</button>
    </div>
  );
}

export default Welcome;
