import React, { useEffect, useState } from "react";
import M from "materialize-css";
import '../App.css'; 

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    const sidenav = document.getElementById('mobile-demo');
    if (sidenav) {
      sidenav.classList.toggle('dark-mode', !darkMode);
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper nav">
          <div className="brand-logo logo">Telegram</div>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <i className="material-icons search" onClick={toggleSearch}>search</i>
            </li>
            <li>
              <div className="setting">Setting</div>
            </li>
            <li className="dark-mode-btn">
              <a href="#!" onClick={toggleDarkMode}>
                {darkMode ? (
                  <i className="material-icons">wb_sunny</i>
                ) : (
                  <i className="material-icons">brightness_2</i>
                )}
              </a>
            </li>
          </ul>
          {isSearchVisible && (
            <form className="right">
              <div className="input-field">
                <input id="search" type="search" required autoFocus />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons" onClick={closeSearch}>close</i>
              </div>
            </form>
          )}
        </div>
      </nav>

      <ul className={`sidenav ${darkMode ? 'dark-mode' : ''}`} id="mobile-demo">
        <li>
          <i className="material-icons search" onClick={toggleSearch}>search</i>
        </li>
        <li><a href="#!">Setting</a></li>
        <li className="dark-mode-btn">
          <a href="#!" onClick={toggleDarkMode}>
            {darkMode ? (
              <i className="material-icons">wb_sunny</i>
            ) : (
              <i className="material-icons">brightness_2</i>
            )}
            {darkMode ? "Day Mode" : "Dark Mode"}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
