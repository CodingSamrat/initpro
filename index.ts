#!/usr/bin/env node

import fs from 'fs'
import { execSync } from 'child_process';
import path from 'path';



const REPO_URL = 'https://github.com/codingsamrat/initpro.git';
const packageJsonPath = './package.json'; // Adjust path if necessary
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
const packageJson = JSON.parse(packageJsonContent);



async function getVersion() {
    // Parse JSON content
    // Extract and return version
    return packageJson.version;
}


// Main function to parse frameworkNames
async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const frameworkName = args[0];
    let projectName = args[1];


    if (!frameworkName) return
    if (!projectName) {
        projectName = `${frameworkName}-initpro`
    }




    //#region HELP
    if (!frameworkName || frameworkName === '--help' || frameworkName === '-h') {
        // Display help message
        console.log(`
Usage: initpro <frameworkName> <projectName>

Commands:
initpro <frameworkName> <projectName>    Generate new project

Options:
-h, --help             Display this help message
-v, --version          Display the version of the tool
    `);
        return;
    }
    //#endregion

    else if (frameworkName === '--version' || frameworkName === '-v') {
        // Display version message
        console.log(`initpro version ${getVersion()}`);
        return;
    }

    // Handle the  frameworkName
    else {
        try {
            // Initializing cloning
            console.log('Initializing...')



            execSync(`git clone --branch ${frameworkName} ${REPO_URL} ${projectName}`, { stdio: 'inherit' });

            execSync(`sudo rm -rf ${projectName}/.git`, { stdio: 'inherit' });
            execSync(`git init ${projectName}`, { stdio: 'inherit' });

            packageJson['name'] = projectName

            await fs.writeFileSync(path.join(projectName, packageJsonPath), JSON.stringify(packageJson, null, 2))

        } catch (error: any) {
            console.log(error.message)
        }
    }
}

main();
