//https://github.com/gatsbyjs/gatsby/issues/15761

reporter.info(`Downloading remote files from Drupal`)
downloadingFilesActivity.start()

// Download all files (await for each pool to complete to fix concurrency issues)
await asyncPool(
    concurrentFileRequests,
    [...nodes.values()].filter(isFileNode),
    async node => {
        await downloadFile(
            { node, store, cache, createNode, createNodeId },
            pluginOptions
        )
    }
)

downloadingFilesActivity.end()