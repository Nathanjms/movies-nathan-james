import React from 'react';
import TypeIt from 'typeit-react';

function About() {



    return (
        <div className="container">
            <div className="intro-section">
                <h1>About</h1>

                <div style={{ paddingTop: '30px' }}>
                    <TypeIt
                        options={{
                            loop: true,
                            speed: 175,
                        }}
                        element={"h4"}
                        getBeforeInit={instance => {
                            instance
                                .type("I'm a Software Developer")
                                .pause(750)
                                .delete(18)
                                .pause(250)
                                .type("Musician")
                                .pause(750)
                                .delete(8)
                                .pause(250)
                                .type("Mathematician")
                                .pause(750)
                                .delete(13)
                                .pause(250)
                                .type("Web Developer")
                            return instance;
                        }}
                    />

                    <div style={{ paddingTop: '25px' }}>
                        <p>
                            Welcome to my website!
                        </p>
                        <p>
                            I'm a Software Developer who's in my first year as a Web Developer!
                        </p>
                        <p>
                            This website was mostly made to create a website using <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>, something I've been learning in my spare time.
                            You can find the code on <a href="https://github.com/Nathanjms/nathan-james" target="_blank" rel="noopener noreferrer">my GitHub</a>.
                        </p>
                        <p>
                            My website now features a back-end for the Movies section! Written using <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> and hosted on Heroku, the code 
                            can be found <a href="https://github.com/Nathanjms/nathan-james-api-postgresql" target="_blank" rel="noopener noreferrer">here</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
