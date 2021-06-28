import React from "react";
import SkillsList from "./SkillsList";
import skillsData from "../../data/SkillsData.json";

function Skills() {
  return (
    <div className="container">
      <div className="intro-section">
        <div>
          <h1>Skills</h1>
          <p>
            Click any of the ratings below to see a bit more information about
            my experience with each!
          </p>
        </div>
        <div className="pt-5">
          <h3 className="pb-3">Web Development</h3>
          <SkillsList skillsData={skillsData.languages.web} />
        </div>
        <div className="pt-5">
          <h3 className="pb-3">Programming</h3>
          <SkillsList skillsData={skillsData.languages.other} />
        </div>
        <div className="pt-5">
          <h3 className="pb-3">Additional Skills</h3>
          <SkillsList skillsData={skillsData.additional} />
        </div>
      </div>
    </div>
  );
}

export default Skills;
