"use strict";

const core = require("@actions/core");
const { exec } = require("subprocess");

const main = async () => {
  const webhook = core.getInput("webhook");
  const secret = core.getInput("secret");
  exec(
    `zip -r code.zip . && 
        curl -X POST -H "Authorization: ${secret}" \
        -F "zipFile=@code.zip" \
        ${webhook}
        `,
    (error, response) => {
      if (error) {
        throw new Error(error);
      }
      core.setOutput("response", response);
    }
  );
};

main().catch((err) => core.setFailed(err.message));
