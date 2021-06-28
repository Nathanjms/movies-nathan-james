import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

function Education() {
    return (
        <div className="container">
            <div>

                <h1>Education</h1>
                <div className="education-card">
                    <div className="university-sub-header">
                        <h3>Integrated Master's in Mathematics</h3>
                        <p>1st Class, University of Nottingham</p>
                    </div>
                    <p>
                        At university, I undertook a 4-year Integrated Master's in Mathematics. My modules focused on Applied Mathematics, such as Mathematical Biology and Computational Mathematics.
                    </p>
                    <p>
                        Click the headers below to see more details!
                    </p>
                    <Accordion>
                        <div>
                            <div>
                                <div className="edu-accord-header">
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                        <strong>Modules</strong>
                                    </Accordion.Toggle>
                                </div>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <p>
                                            <strong>Fourth Year:</strong>
                                        </p>
                                        <ul>
                                            <li>Dissertation: <i>Chemokine Gradient and Dendritic Cell Migration in Lymphatic Interstitium</i></li>
                                            <li>Scientific Computing and C++ </li>
                                            <li>Advanced Techniques for Differential Equations </li>
                                            <li>Topics in Biomedical Mathematics</li>
                                            <li>Fluid Dynamics </li>
                                        </ul>
                                        <p>
                                            <strong>Third Year:</strong>
                                        </p>
                                        <ul>
                                            <li>Project: <i>The Geometrical Theory of Diffraction</i></li>
                                            <li>Differential Equations</li>
                                            <li>Electromagnetism </li>
                                            <li>Scientific Computation and Numerical Analysis </li>
                                            <li>Advanced Quantum Theory</li>
                                            <li>Mathematical Medicine and Biology</li>
                                        </ul>
                                        <p>
                                            Topics in my first two years involved mostly applied and computational maths along with some statistics, and even a module in German.
                                    </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </div>
                            <div className="edu-accord-header">
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                                    <strong>Dissertation:</strong> <i>Chemokine Gradient and Dendritic Cell Migration in Lymphatic Interstitium</i>
                                </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>
                                                My dissertation involved developing a computational Mathematical model to investigate chemokine gradient development in interstitial tissues.
                                                I focused on three main biological factors (CCL21 binding/unbinding, diffusion of CCL21, and dendritic cell cleaving) and converted them into Mathematical models.
                                            </p>
                                            <p>
                                                My dissertation enabled me to combine my interest in both programming and Maths to come up with a suitable model that conclusions
                                                could be drawn from.
                                            </p>
                                            <p>
                                                I used the programming language MATLAB to simulate the model computationally and to produce a time-dependent animation and results. Despite the
                                                simplifications made throughout the model building process, there was reasonably good agreement with experimental data.
                                            </p>
                                            <p>
                                                The code can be found <a href="https://github.com/Nathanjms/G14DIS-Code">on my GitHub</a>.
                                            </p>
                                        </div>
                                        <div className="col-md-6" style={{ textAlign: 'center' }}>
                                            <img src="/9PlotsInOneCleaving.png" alt="Figure from my dissertation" style={{ width: '80%' }} />
                                        </div>
                                    </div>

                                </Card.Body>
                            </Accordion.Collapse>
                        </div>
                        <div>
                            <div className="edu-accord-header">
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                                    <strong>Project:</strong> <i>The Geometrical Theory of Diffraction</i>
                                </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <p>
                                        My third year project was a lot more Mathematical than my dissertation. It involved developing the Theory of Geometrical Diffraction from the wave equation,
                                        and then applying it to the scattering of waves in a parabola, as well as a circle.
                                    </p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </div>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Education;