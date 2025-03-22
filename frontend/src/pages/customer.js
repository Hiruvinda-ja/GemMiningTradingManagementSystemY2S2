import React from "react";
import "../style/customer.css"; // Import external CSS

const investors = [
  { id: 1, name: "Kasun", maxInvestment: "Rs.5000" },
  { id: 2, name: "Kasun", maxInvestment: "Rs.5000" },
  { id: 3, name: "Kasun", maxInvestment: "Rs.5000" }
];

const Investors = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">Crystal core</h1>
        <nav className="sidebar-menu">
          <button>Register new</button>
          <button>View investors</button>
          <button>Login Admin</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="top-bar">
          <nav className="nav-links">
            <a href="#">Home</a>
            <a href="#">Lands</a>
            <a href="#">Machine</a>
            <a href="#">Investors</a>
          </nav>
        </header>

        <section className="search-section">
          <h2>Find investors</h2>
          <div className="search-bar">
            <input type="text" placeholder="search" />
            <button>🔍</button>
          </div>
          <button className="join-btn">Join new investor</button>
        </section>

        {/* Investor Cards */}
        <section className="investors-list">
          {investors.map((investor) => (
            <div className="investor-card" key={investor.id}>
              <img src="https://via.placeholder.com/100" alt="Investor" />
              <p><strong>Name:</strong> {investor.name}</p>
              <p><strong>Invest max:</strong> {investor.maxInvestment}</p>
              <button className="invite-btn">Invite</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Investors;
