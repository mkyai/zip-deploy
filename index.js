"use strict";

const core = require("@actions/core");
const { exec } = require("child_process");
require("dotenv").config();

const main = async () => {
  const webhook = core.getInput("webhook") || process.env.DEPLOY_WEBHOOK;
  const secret = core.getInput("secret") || process.env.WEBHOOK_SECRET;

  exec(
    `rm -rf node_modules && echo $(git log -1 --pretty=%B) > changelog && zip -r code.zip . && curl -X POST -H "Authorization: ${secret}" -F "zipFile=@code.zip" ${webhook}`,
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
