#!/usr/bin/env node

// index.ts
import { execSync } from "child_process";
function main() {
  const args = process.argv.slice(2);
  const frameworkName = args[0];
  let projectName = args[1];
  if (!frameworkName) return;
  if (!projectName) {
    projectName = `${frameworkName}-initpro`;
  }
  const version = "1.0.0";
  if (!frameworkName || frameworkName === "--help" || frameworkName === "-h") {
    console.log(`
Usage: initpro <frameworkName> <projectName>

Commands:
initpro <frameworkName> <projectName>    Generate new project

Options:
-h, --help             Display this help message
-v, --version          Display the version of the tool
    `);
    return;
  } else if (frameworkName === "--version" || frameworkName === "-v") {
    console.log(`initpro version ${version}`);
    return;
  } else {
    try {
      const repoUrl = "https://github.com/codingsamrat/initpro.git";
      console.log("Initializing...");
      execSync(`git clone --branch ${frameworkName} ${repoUrl} ${projectName}`, { stdio: "inherit" });
      execSync(`sudo rm -rf ${projectName}/.git`, { stdio: "inherit" });
      execSync(`git init ${projectName}`, { stdio: "inherit" });
    } catch (error) {
      console.log(error.message);
    }
  }
}
main();
