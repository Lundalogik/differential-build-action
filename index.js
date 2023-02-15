const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const filematcher = require('./filematcher');

async function run() {
    const token = core.getInput('githubToken');
    const octokit = github.getOctokit(token);
    let runEverything = false;

    let filenames = [];

    if (github.context.payload.pull_request.changed_files > 3000) {
        console.log('More than 3000 files updated, running everything!');
        runEverything = true;
    } else {
        do {
            const { data: files } = await octokit.pulls.listFiles({
                owner: github.context.payload.repository.owner.login,
                repo: github.context.payload.repository.name,
                pull_number: github.context.payload.pull_request.number,
                per_page: 100,
            });
            const paginatedFilenames = files.map((file) => file.filename);
            filenames = [...filenames, ...paginatedFilenames];
        } while (
            filenames.length < github.context.payload.pull_request.changed_files
        );
    }

    if (filenames.find((file) => file.startsWith('.github/workflows/'))) {
        console.log('Workflows updated, running everything!');
        runEverything = true;
    }

    if (runEverything) {
        core.setOutput('run_python', 'true');
        core.setOutput('run_admin', 'true');
        core.setOutput('run_importer', 'true');
        core.setOutput('run_webclient', 'true');
        core.setOutput('run_new_webclient', 'true');
        return;
    }

    const run = filematcher(filenames);

    console.log('run_python =', run.python);
    console.log('run_admin =', run.admin);
    console.log('run_importer =', run.importer);
    console.log('run_webclient =', run.webclient);
    console.log('run_new_webclient =', run.newWebClient);

    core.setOutput('run_python', `${run.python}`);
    core.setOutput('run_admin', `${run.admin}`);
    core.setOutput('run_importer', `${run.importer}`);
    core.setOutput('run_webclient', `${run.webclient}`);
    core.setOutput('run_new_webclient', `${run.newWebClient}`);
}

run();
