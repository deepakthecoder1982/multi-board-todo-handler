import "./App.css";
import React, { useState } from "react";
import Todo from "./pages/Todo";

function App() {
  // Step 1: Create a state variable for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Step 2: Event handler to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`max-h-screen transiotion-all ease-in-out delay-50 ${isDarkMode ? 'bg-gray-900 dark-mode-on' : ""}`}>
      <header className={`p-4 shadow-md font-bold ${isDarkMode ? 'bg-gray-900 text-white shadow-gray-600' : 'bg-white'}`}>
        <span className="container text-5xl text-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">TODO</span>
        
        {/* Step 3: Dark mode switch */}
        {/* <div className="dark-mode rounded-xl  ">
          <label htmlFor="darkModeSwitch"></label>
          <input
            type="checkbox"
            id="darkModeSwitch"
            onChange={toggleDarkMode}
            checked={isDarkMode}
            className="border-0"
          />
        </div> */}
      </header>

      <section className={`font-mono  transiotion-all ease-in-out delay-80 ${isDarkMode ? 'text-black ' : 'text-black'}`}>
        <Todo isDarkMode={isDarkMode} />
      </section>
    </div>
  );
}

export default App;
