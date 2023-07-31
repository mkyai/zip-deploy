"use strict";

const core = require("@actions/core");
const { exec } = require("child_process");

const main = async () => {
  const webhook = core.getInput("webhook");
  const secret = core.getInput("secret");
  exec(
    `zip -r code.zip . && 
        curl -X POST -H "Authorization: ${secret}" \
        -F "zipFile=@code.zip" \
        ${webhook}
        `,
    (error, stdout) => {
      if (error) {
        throw new Error(error);
      }
      core.setOutput("response", stdout);
    }
  );
};

main().catch((err) => core.setFailed(err.message));
