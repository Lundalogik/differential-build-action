function filematcher(filenames) {
    const sharedFrontendFiles = [
        '.nvmrc',
        '.npmrc',
        'package.json',
        'package-lock.json',
    ];
    const matchesAdminFrontend = ['frontend/admin/'];
    const matchesWebclientFrontend = ['frontend/webclient/'];
    const matchesNewWebclientFrontend = ['frontend/new-webclient/'];
    const matchesImportFrontend = ['frontend/importer/'];

    const pythonWillRunForAllButThese = [
        ...sharedFrontendFiles,
        ...matchesAdminFrontend,
        ...matchesWebclientFrontend,
        ...matchesNewWebclientFrontend,
        ...matchesImportFrontend,
    ];

    matchesAdminFrontend.push(...sharedFrontendFiles);
    matchesWebclientFrontend.push(...sharedFrontendFiles);
    matchesNewWebclientFrontend.push(...sharedFrontendFiles);
    matchesImportFrontend.push('.nvmrc');

    const run_python = !!filenames.find((file) => {
        return pythonWillRunForAllButThese.every((match) => {
            return !file.startsWith(match);
        });
    });
    const run_admin = !!filenames.find((file) => {
        return matchesAdminFrontend.find((match) => {
            return file.startsWith(match);
        });
    });
    const run_webclient = !!filenames.find((file) => {
        return matchesWebclientFrontend.find((match) => {
            return file.startsWith(match);
        });
    });
    const run_new_webclient = !!filenames.find((file) => {
        return matchesNewWebclientFrontend.find((match) => {
            return file.startsWith(match);
        });
    });
    const run_importer = !!filenames.find((file) => {
        return matchesImportFrontend.find((match) => {
            return file.startsWith(match);
        });
    });

    return {
        python: run_python,
        admin: run_admin,
        webclient: run_webclient,
        newWebclient: run_new_webclient,
        importer: run_importer,
    };
}

module.exports = filematcher;
