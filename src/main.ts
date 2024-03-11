import * as core from '@actions/core'

export async function run(): Promise<void> {
  try {
    core.setOutput('log position', 'console.log at main.ts')
  } catch (error: any) {
    core.setFailed(error.message)
  }
}
