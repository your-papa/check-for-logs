import * as core from '@actions/core'

import { findConsoleLogs } from './logs'
import { check } from './check'

export async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token')
    const logPositions = findConsoleLogs('./src')
    const output = await check(token, logPositions)
    core.setOutput('logs', output)
    //@ts-ignore
  } catch (error: any) {
    core.setFailed(error.message)
  }
}
