import * as github from '@actions/github'
import * as core from '@actions/core'

function verboseOutput(name: string, value: string): void {
  core.info(`Setting output: ${name}: ${value}`)
  core.setOutput(name, value)
}

async function run(): Promise<void> {
  const token = core.getInput('token', {required: true})
  const repository = core.getInput('repository', {required: true})
  const octokit = new github.GitHub(token)
  const [owner, repo] = repository.split('/')

  core.info(
    `\n############### Fetch GitHub Action Queue start ##################\n` +
      `repository: "${repository}"`
  )

  const workflowRuns = []

  for (const status of [`queued`, `in_progress`]) {
    const repoWorkflowRunsQueued = await octokit.paginate(
      octokit.actions.listRepoWorkflowRuns.endpoint.merge({
        owner,
        repo,
        status
      })
    )
    for (const workflowRun of repoWorkflowRunsQueued) {
      workflowRuns.push(workflowRun)
    }
  }

  verboseOutput('workflowRuns', JSON.stringify(workflowRuns))
  verboseOutput('nrOfWorkflowRuns', String(workflowRuns.length))
}

run()
  .then(() =>
    core.info(
      '\n############### Fetch GitHub Action Queue complete ##################\n'
    )
  )
  .catch(e => core.setFailed(e.message))
