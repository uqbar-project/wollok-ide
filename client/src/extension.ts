/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path'
import { commands, ExtensionContext, ShellExecution, Task, tasks, window, workspace } from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node'

let client: LanguageClient

export function activate(context: ExtensionContext): void {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  )
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for Wollok documents
    documentSelector: [{ scheme: 'file', language: 'wollok' }],
    synchronize: {
      configurationSection: 'wollok-lsp-ide',
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  }

  context.subscriptions.push(
    commands.registerCommand('wollok.start.repl', () => {
      const wollokCli = workspace.getConfiguration('wollokLinter').get('cli-path')

      const currentDocument = window.activeTextEditor.document
      const folder = workspace.workspaceFolders[0]
      const currentFileName = path.basename(currentDocument.uri.path)

      tasks.executeTask(new Task(
        { type: 'wollok', task: 'repl' },
        folder,
        `Wollok Repl: ${currentFileName}`,
        'wollok',
        new ShellExecution(`${wollokCli} repl ${currentDocument.fileName}`)
      ))
    })
  );

  context.subscriptions.push(
    commands.registerCommand('wollok.run.allTests', () => {
      const wollokCli = workspace.getConfiguration('wollokLinter').get('cli-path')
      const folder = workspace.workspaceFolders[0]

      tasks.executeTask(new Task(
        { type: 'wollok', task: 'run tests' },
        folder,
        `Wollok run all tests`,
        'wollok',
        new ShellExecution(`${wollokCli} test`)
      ))
    })
  );


  // Create the language client and start the client.
  client = new LanguageClient(
    'wollok-lsp-ide',
    'Wollok',
    serverOptions,
    clientOptions
  )

  // Start the client. This will also launch the server
  client.start()
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined
  }
  return client.stop()
}