import * as github from '@actions/github'
import * as core from '@actions/core'
import { LogPosition } from './logs'

export async function check(
  repoToken: string,
  logs: Array<LogPosition>
): Promise<any> {
  const octokit = github.getOctokit(repoToken)

  const check = await octokit.rest.checks.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    name: 'check-logs',
    head_sha: github.context.sha,
    conclusion: logs.length > 0 ? 'action_required' : 'success',
    output: {
      title: 'Check logs',
      summary: 'Check logs for console.log',
      annotations: logs.map(log => {
        return {
          path: log.file,
          start_line: log.line,
          end_line: log.line,
          annotation_level: 'failure',
          message: 'Found console.log'
        }
      })
    }
  })

  if (check.status !== 201) {
    throw new Error(`Failed to create check: ${check.status}`)
  }
  core.info(`Check created: ${check.data.html_url}`)
  return check.data.html_url
}
