import * as path from 'path'
import { WollokDebugSession } from '../debug-session'
import * as fs from 'fs'

/**
 * In this file the debug session is being launched as an executable
 * instead of inline (the way it normally launches), which means we
 * dont have access to the vscode API so we must mock the workspace
 */

const FIXTURES_ROOT = path.resolve(__dirname, '../../../../packages/debug-adapter/src/test/fixtures')

const wollokFiles = fs
  .readdirSync(FIXTURES_ROOT)
  .map(aFilePath => path.resolve(FIXTURES_ROOT, aFilePath))

const mockWorkspace = {
  findFiles: (_globPattern: string) => Promise.resolve(wollokFiles.map(fsPath =>  ({ fsPath }))),
  openTextDocument: (path: {fsPath: string}, uri: { fsPath: string }) => Promise.resolve({ getText: () => fs.readFileSync(path.fsPath).toString('utf-8'), uri: { fsPath: path.fsPath } }),
}

const session = new WollokDebugSession(mockWorkspace as any)
process.on('SIGTERM', () => {
  session.shutdown()
})
session.start(process.stdin, process.stdout)
