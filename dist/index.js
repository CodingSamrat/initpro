#!/usr/bin/env node

// index.ts
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
var REPO_URL = "https://github.com/codingsamrat/initpro.git";
var packageJsonPath = "./package.json";
var packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
var packageJson = JSON.parse(packageJsonContent);
async function getVersion() {
  return packageJson.version;
}
async function main() {
  const args = process.argv.slice(2);
  const frameworkName = args[0];
  let projectName = args[1];
  if (!frameworkName) return;
  if (!projectName) {
    projectName = `${frameworkName}-initpro`;
  }
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
    console.log(`initpro version ${getVersion()}`);
    return;
  } else {
    try {
      console.log("Initializing...");
      execSync(`git clone --branch ${frameworkName} ${REPO_URL} ${projectName}`, { stdio: "inherit" });
      execSync(`sudo rm -rf ${projectName}/.git`, { stdio: "inherit" });
      execSync(`git init ${projectName}`, { stdio: "inherit" });
      console.log(packageJson);
      packageJson["name"] = projectName;
      console.log(packageJson);
      await fs.writeFileSync(path.join(projectName, packageJsonPath), JSON.stringify(packageJson, null, 2));
    } catch (error) {
      console.log(error.message);
    }
  }
}
main();
