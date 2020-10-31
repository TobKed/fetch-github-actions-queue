import * as github from '@actions/github'
import * as core from '@actions/core'
import * as rest from '@octokit/rest'

function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (value === undefined) {
    const message = `${key} was not defined.`
    throw new Error(message)
  }
  return value
}

async function printDebug(
  item: object | string | boolean | number,
  description: string = ''
): Promise<void> {
  const itemJson = JSON.stringify(item)
  core.debug(`\n ######### ${description} ######### \n: ${itemJson}\n\n`)
}

async function run(): Promise<void> {
  const token = core.getInput('token', {required: true})
  const repository = core.getInput('repository', {required: true})
  const octokit = new github.GitHub(token)
  const context = github.context
  const [owner, repo] = repository.split('/')

  core.info(
    `\n############### Fetch GitHub Action Queue start ##################\n` +
      `repository: "${repository}"`
  )

  for (const status of [`queued`, `in_progress`]) {
    const repoWorkflowRunsQueued = await octokit.paginate(
      octokit.actions.listRepoWorkflowRuns.endpoint.merge({
        owner,
        repo,
        status
      })
    )
    for (const workflowRun of repoWorkflowRunsQueued) {
      core.info(`workflowRun [${status}]: ${workflowRun}`)
    }
  }
}

run()
  .then(() =>
    core.info(
      '\n############### Fetch GitHub Action Queue complete ##################\n'
    )
  )
  .catch(e => core.setFailed(e.message))
