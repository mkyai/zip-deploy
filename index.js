"use strict";

const core = require("@actions/core");
const { exec } = require("child_process");
const { promises: fs } = require("fs");
require("dotenv").config();

const decorateMessage = (msg) => {
  const updates = msg.split(" | ");
  const changelog = String(updates.map((update) => `- ${update}`).join("\\n"));
  return `DEPLOYMENT_UPDATES="\\n${changelog}"`;
};

const main = async () => {
  const webhook = core.getInput("webhook") || process.env.DEPLOY_WEBHOOK;
  const secret = core.getInput("secret") || process.env.WEBHOOK_SECRET;
  const msg = core.getInput("message");
  if (msg) {
    const changelog = decorateMessage(String(msg));
    fs.writeFile("./changelog", changelog);
  }

  exec(
    `zip -r code.zip . && curl -X POST -H "Authorization: ${secret}" -F "zipFile=@code.zip" ${webhook}`,
    (error, stdout) => {
      if (error) {
        console.log("ERROR:", error);
        throw new Error(error);
      }
      console.log("STDOUT", stdout);
      core.setOutput("response", stdout);
    }
  );
};

main().catch((err) => core.setFailed(err.message));
