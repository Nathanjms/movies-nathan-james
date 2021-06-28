import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Music from "./Music";
import Skills from "./Skills";
import Education from "./Education";
import Footer from "../Global/Footer";

function App() {
  return (
    <div className="App">
      <header id="header" className="d-flex">
        <Navbar />
      </header>

      <section id="home">
        <Home />
      </section>

      <main>
        <section id="about" className="main-body-sections">
          <About />
        </section>
        <section id="skills" className="main-body-sections">
          <Skills />
        </section>
        <section id="education" className="main-body-sections">
          <Education />
        </section>
        <section id="music" className="main-body-sections">
          <Music />
        </section>
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}
export default App;
