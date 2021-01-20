const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
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
            name: 'githubProfileURL',
            message: 'Provide your GitHub profile URL:',
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
            message: 'Enter the assets URL of a screenshot of your project to demonstrate how it works:',
        },
        {
            type: 'input',
            name: 'installationInstructions',
            message: 'Describe the installation process:',
        },
        {
            type: 'input',
            name: 'usageInstructions',
            message: 'Describe how to use the project application:',
        },
        {
            type: 'input',
            name: 'testInstructions',
            message: 'Provide testing instructions:',
        },
        {
            type: 'input',
            name: 'contributionGuidelines',
            message: 'Provide contribution guidelines:',
        },
        {
            type: 'input',
            name: 'languages',
            message: 'Enter the languages and libraries used in this project (separated by commas):',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Enter the license for your project (e.g., MIT):',
            choices: ["MIT", "GNU", "ISC", "Other"]
            // .then(answers => {
            //     console.log('answer:', answers.license);
            // })
        },
        {
            type: 'input',
            name: 'contributor',
            message: 'Provide the GitHub user name of any project contributors (separate name by commas):',
        },
        {
            type: 'input',
            name: 'contactInfo',
            message: 'Enter your email address for any questions about your project:',
        },
    ]);
};
//Template in which user answers to render for myREADME.md file
function generateMarkdown(answers) {
    return `![GitHub last commit](https://img.shields.io/github/last-commit/${answers.github}/${answers.projectName})  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/${answers.github}/${answers.projectName})  ![GitHub watchers](https://img.shields.io/github/watchers/${answers.github}/${answers.projectName}?label=Watch&style=social)  ![GitHub top language](https://img.shields.io/github/languages/top/${answers.github}/${answers.projectName})  ![GitHub license](https://img.shields.io/badge/license-${answers.license}-blueviolet) <br> 

# ${answers.projectName} <br>
    
## Table of Contents 
1. [About the Project](#About-The-Project)
1. [Project Links](#Project-Links)
1. [Demo](#Demo)
1. [Getting Started](#Getting-Started)
1. [Installation](#Installation)
1. [Usage](#Usage)
1. [Tests](#Tests)
1. [Contribution Guidelines](#Contribution-Guidelines)
1. [Project Team](#Project-Team)
1. [Questions](#Questions)
1. [License](#License)
    
## About The Project <br>
${answers.projectSummary}
    
## Project Links
[Repo Link](https://github.com/${answers.github}/${answers.projectName}) <br>
[GitHub Project Link](https://${answers.github}.github.io/${answers.projectName}/)
    
## Demo
    
##### The following is a screenshot of the application and overview of its functionality: <br>
    
![Project Preview](${answers.demoURL}) 
    
## Getting Started
    
#### Languages and libraries used in this project (separate with commas):
${answers.languages}
    
#### Installation: 
\`\`\`  
${answers.installationInstructions}
\`\`\`

#### Usage:
\`\`\`  
${answers.usageInstructions}
\`\`\`

#### Tests:
\`\`\`  
${answers.testInstructions}
\`\`\`

#### Contribution:
\`\`\`  
${answers.contributionGuidelines }
\`\`\`
    
## Project Team
[${answers.github}](${answers.githubProfileURL}) <br>
[${answers.contributor}](https://github.com/${answers.contributor})

## Questions
<details>
    <summary>Contact</summary>
    ${answers.contactInfo}
</details>
    
## License
#### Distributed under the ${answers.license} License. See [Choose A License](https://choosealicense.com/) for more information.

##### This README was generated with :hearts:  by [Good README Generator](https://github.com/onomatopoetica/Good-README-Generator)`;
}

// For loop to take in more than one project contributor...
// const contributors = answers.contributor
// const contributorsArray = contributors.split(", ");
// console.log(contributorsArray);
// var resultContributors;
// for (i = 0; i < contributorsArray.length; i++) {
//     resultContributors = contributorsArray[i];
// }

// Using async/await to for final writeFile
const init = async () => {
    console.log('Hi! Create your README!');
    try {
        const answers = await promptUser();

        const finalFile = generateMarkdown(answers);
        // function to write README file
        await writeFileAsync('myREADME.md', finalFile);

        console.log('Yay! Your README successfully wrote to myREADME.md');
    } catch (err) {
        console.log('Ooops, an error has occurred');
    }
};
// function call to initialize program
init();










