const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    const token = core.getInput('githubToken');
    const octokit = new github.GitHub(token);

    const { data: files } = await octokit.pulls.listFiles({
        owner: github.context.payload.repository.owner.login,
        repo: github.context.payload.repository.name,
        pull_number: github.context.payload.pull_request.number
    });

    const filenames = files.map(file => file.filename);

    // If the workflows were updated, run everything!
    const workflowsUpdated = !!filenames.find(file => file.startsWith('.github/workflows'));

    const run_python = workflowsUpdated || !!filenames.find(file => !file.startsWith('frontend/'));
    const run_admin = workflowsUpdated || !!filenames.find(file => file.startsWith('frontend/admin/'));
    const run_import = workflowsUpdated || !!filenames.find(file => file.startsWith('frontend/import/'));
    const run_webclient = workflowsUpdated || !!filenames.find(file => file.startsWith('frontend/webclient/'));

    core.setOutput('run_python', `${run_python}`);
    core.setOutput('run_admin', `${run_admin}`);
    core.setOutput('run_import', `${run_import}`);
    core.setOutput('run_webclient', `${run_webclient}`);
}

run();
