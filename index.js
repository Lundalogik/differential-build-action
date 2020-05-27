const core = require('@actions/core');
const github = require('@actions/github');

try {
    const changedFiles = core.getInput('changed-files');
    console.log(`Changed files: ${changedFiles}`);
    core.setOutput("run_python", 'false');
    core.setOutput("run_admin", 'false');
    core.setOutput("run_import", 'false');
    core.setOutput("run_webclient", 'false');
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
