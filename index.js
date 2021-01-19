const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
// const generateMarkdown = require('./utils/generateMarkdown');
const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user for the README

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:',
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter your GitHub repository name (for which you are creating a README):',
        },
        {
            type: 'input',
            name: 'projectSummary',
            message: 'Enter a summary describing your project:',
        },
        {
            type: 'input',
            name: 'demoURL',
            message: 'Enter the URL of a screenshot or video clip of your project to demonstrate how it works \n (format example - https://github.com/githubUserName/project-name/tree/main/assets/screenshot.png):',
        },
        {
            type: 'input',
            name: 'installationInstructions',
            message: 'Describe the installation process, if any:',
        },
        {
            type: 'input',
            name: 'languages',
            message: 'Enter the languages and libraries used in this project (separated by commas):',
        },
        {
            type: 'input',
            name: 'license',
            message: 'Enter the license for your project (E.g., MIT):',
        },
        {
            type: 'input',
            name: 'contactInfo',
            message: 'Enter your email address for any questions about your project:',
        },
    ]);
};

function generateMarkdown(answers) {
    return `![GitHub last commit](https://img.shields.io/github/last-commit/${answers.github}/${answers.projectName})  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/${answers.github}/${answers.projectName})  ![GitHub watchers](https://img.shields.io/github/watchers/${answers.github}/${answers.projectName}?label=Watch&style=social)  ![GitHub top language](https://img.shields.io/github/languages/top/${answers.github}/${answers.projectName})  ![GitHub license](https://img.shields.io/badge/license-${answers.license}-blueviolet) <br> 

# ${answers.projectName} <br>
    
## Table of Contents
1. [About the Project](#About-The-Project)
1. [Project Links](#Project-Links)
1. [Demo](#Demo)
1. [Getting Started](#Getting-Started)
1. [Project Creator](#Project-Creator)
1. [License](#License)
    
## About The Project <br>
${answers.projectSummary}
    
## Project Links
[Repo Link](https://github.com/${answers.github}/${answers.projectName}) <br>
[GitHub Project Link](https://${answers.github}.github.io/${answers.projectName}/)
    
## Demo
    
##### The following is a screenshot of the application and overview of its functionality: <br>
    
![Screenshot](${answers.demoURL}) 
    
## Getting Started
    
#### Languages and libraries used in this project:
${answers.languages}
    
#### Installation: <br>
\`\`\`  
${answers.installationInstructions}
\`\`\`
    
## Project Creator
<details>
    <summary>Contact</summary>
    ${answers.contactInfo}
</details>
    
## License
##### Distributed under the ${answers.license} License. See [Choose A License](https://choosealicense.com/) for more information.`;
}

// Using async/await for final writeFile
const init = async () => {
    console.log('Hi! Create your README!');
    try {
        const answers = await promptUser();

        const finalFile = generateMarkdown(answers);

        await writeFileAsync('myREADME.md', finalFile);

        console.log('Successfully wrote to myREADME.md');
    } catch (err) {
        console.log(err);
    }
};

init();


// function to write README file


// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, (err, data) => {
//         err ? console.log('Ooops, an error has occurred') : console.log('Yay! Your README has been generated!')
//     })
// }

// function to initialize program
// function init() {

// }

// function call to initialize program
// init();


