#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// index.ts
var import_fs = __toESM(require("fs"), 1);
var import_child_process = require("child_process");
var import_path = __toESM(require("path"), 1);
var REPO_URL = "https://github.com/codingsamrat/initpro.git";
var packageJsonPath = "./package.json";
var packageJsonContent = import_fs.default.readFileSync(packageJsonPath, "utf8");
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
      (0, import_child_process.execSync)(`git clone --branch ${frameworkName} ${REPO_URL} ${projectName}`, { stdio: "inherit" });
      (0, import_child_process.execSync)(`sudo rm -rf ${projectName}/.git`, { stdio: "inherit" });
      (0, import_child_process.execSync)(`git init ${projectName}`, { stdio: "inherit" });
      console.log(packageJson);
      packageJson["name"] = projectName;
      console.log(packageJson);
      await import_fs.default.writeFileSync(import_path.default.join(projectName, packageJsonPath), JSON.stringify(packageJson, null, 2));
    } catch (error) {
      console.log(error.message);
    }
  }
}
main();
