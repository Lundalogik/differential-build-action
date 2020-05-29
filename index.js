const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    const token = core.getInput('githubToken');
    const octokit = new github.GitHub(token);
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

    const run_python =
        runEverything ||
        !!filenames.find((file) => !file.startsWith('frontend/'));
    const run_admin =
        runEverything ||
        !!filenames.find((file) => file.startsWith('frontend/admin/'));
    const run_importer =
        runEverything ||
        !!filenames.find((file) => file.startsWith('frontend/importer/'));
    const run_webclient =
        runEverything ||
        !!filenames.find((file) => file.startsWith('frontend/webclient/'));

    console.log('run_python =', run_python);
    console.log('run_admin =', run_admin);
    console.log('run_importer =', run_importer);
    console.log('run_webclient =', run_webclient);

    core.setOutput('run_python', `${run_python}`);
    core.setOutput('run_admin', `${run_admin}`);
    core.setOutput('run_importer', `${run_importer}`);
    core.setOutput('run_webclient', `${run_webclient}`);
}

run();
