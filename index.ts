#!/usr/bin/env node

import { execSync } from 'child_process';


// Main function to parse frameworkNames
function main(): void {
    const args = process.argv.slice(2);
    const frameworkName = args[0];
    let projectName = args[1];


    if (!frameworkName) return
    if (!projectName) {
        projectName = `${frameworkName}-initpro`
    }


    // Define version
    const version = '1.0.0';

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
        console.log(`initpro version ${version}`);
        return;
    }

    // Handle the  frameworkName
    else {
        try {
            const repoUrl = 'https://github.com/codingsamrat/initpro.git';
            console.log('Initializing...')
            execSync(`git clone --branch ${frameworkName} ${repoUrl} ${projectName}`, { stdio: 'inherit' });

            execSync(`sudo rm -rf ${projectName}/.git`, { stdio: 'inherit' });
            execSync(`git init ${projectName}`, { stdio: 'inherit' });
        } catch (error: any) {
            console.log(error.message)
        }
    }
}

main();
