const filematcher = require('./filematcher');

const testCases = [
    {
        filenames: [''],
        expected: {
            python: false,
            admin: false,
            webclient: false,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: ['.nvmrc'],
        expected: {
            python: false,
            admin: true,
            webclient: true,
            newWebclient: true,
            importer: true,
        },
    },
    {
        filenames: ['.npmrc'],
        expected: {
            python: false,
            admin: true,
            webclient: true,
            newWebclient: true,
            importer: false,
        },
    },
    {
        filenames: ['package.json'],
        expected: {
            python: false,
            admin: true,
            webclient: true,
            newWebclient: true,
            importer: false,
        },
    },
    {
        filenames: ['package-lock.json'],
        expected: {
            python: false,
            admin: true,
            webclient: true,
            newWebclient: true,
            importer: false,
        },
    },
    {
        filenames: ['frontend/admin/somefolder/some.file.ts'],
        expected: {
            python: false,
            admin: true,
            webclient: false,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: ['frontend/webclient/someotherfolder/some.other.file.ts'],
        expected: {
            python: false,
            admin: false,
            webclient: true,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: [
            'frontend/new-webclient/someotherfolder/some.other.file.ts',
        ],
        expected: {
            python: false,
            admin: false,
            webclient: false,
            newWebclient: true,
            importer: false,
        },
    },
    {
        filenames: ['frontend/importer/blah/blah-blah.ts'],
        expected: {
            python: false,
            admin: false,
            webclient: false,
            newWebclient: false,
            importer: true,
        },
    },
    {
        filenames: ['pyproject.toml'],
        expected: {
            python: true,
            admin: false,
            webclient: false,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: ['lime_view/defaults.py'],
        expected: {
            python: true,
            admin: false,
            webclient: false,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: [
            'frontend/admin/somefolder/some.file.ts',
            'lime_view/defaults.py',
        ],
        expected: {
            python: true,
            admin: true,
            webclient: false,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: [
            'frontend/webclient/someotherfolder/some.other.file.ts',
            'lime_webclient/errors.py',
        ],
        expected: {
            python: true,
            admin: false,
            webclient: true,
            newWebclient: false,
            importer: false,
        },
    },
    {
        filenames: [
            'frontend/new-webclient/someotherfolder/some.other.file.ts',
            'lime_webclient/errors.py',
        ],
        expected: {
            python: true,
            admin: false,
            webclient: false,
            newWebclient: true,
            importer: false,
        },
    },
    {
        filenames: ['.npmrc', 'lime_webclient/errors.py'],
        expected: {
            python: true,
            admin: true,
            webclient: true,
            newWebclient: true,
            importer: false,
        },
    },
];

testCases.map((testCase) => {
    return test(`${JSON.stringify(testCase.filenames)}`, () => {
        expect(filematcher(testCase.filenames)).toEqual(testCase.expected);
    });
});
