module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/git',
            {
                assets: [
                    'CHANGELOG.md',
                    'dist/index.js',
                    'package.json',
                    'package-lock.json',
                ],
            },
        ],
        '@semantic-release/github',
    ],
};
