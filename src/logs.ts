import fs from 'fs'
import path from 'path'

export type LogPosition = {
  file: string
  line: number
}

export function findConsoleLogs(dirPath: string): LogPosition[] {
  const logPositions: LogPosition[] = []
  const dirs = [dirPath]

  while (dirs.length > 0) {
    const currentDir = dirs.pop() as string
    const filesAndDirs = fs.readdirSync(currentDir)

    for (const fileOrDir of filesAndDirs) {
      const fullPath = path.join(currentDir, fileOrDir)
      const stats = fs.statSync(fullPath)

      if (stats.isDirectory()) {
        dirs.push(fullPath) // Add to dirs to process this directory later
      } else if (stats.isFile() && /\.(ts|svelte)$/.test(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf-8')
        fileContents.split('\n').forEach((line, index) => {
          if (line.includes('console.log')) {
            logPositions.push({ file: fullPath, line: index + 1 })
          }
        })
      }
    }
  }

  return logPositions
}
