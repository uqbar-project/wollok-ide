import {
  CompletionItem,
  createConnection,
  InitializeParams,
  ProposedFeatures,
  TextDocuments,
} from 'vscode-languageserver'

import { validateTextDocument, completions } from './linter';
import { initializeSettings, settingsChanged } from './settings'

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all)

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments = new TextDocuments()

connection.onInitialize((params: InitializeParams) => {
  initializeSettings(connection, params.capabilities)

  return {
    // Tell the client which capabilities the server supports
    capabilities: {
      textDocumentSync: documents.syncKind,
      completionProvider: {
        resolveProvider: true
      }
    }
  }
})

connection.onDidChangeConfiguration(change => {
  settingsChanged(connection, change)

  // Revalidate all open text documents
  documents.all().forEach(validateTextDocument(connection))
})

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
  validateTextDocument(connection)(change.document)
})

connection.onDidChangeWatchedFiles(_change => {
  // Monitored files have change in VSCode
  connection.console.log('We received an file change event')
})

// This handler provides the initial list of the completion items.
connection.onCompletion(completions)

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve(
  (item: CompletionItem): CompletionItem => {
    // if (item.data === 1) {
    //   item.detail = 'TypeScript details'
    //   item.documentation = 'TypeScript documentation'
    // }
    return item
  }
)

/*
connection.onDidOpenTextDocument((params) => {
	// A text document got opened in VSCode.
	// params.textDocument.uri uniquely identifies the document. For documents store on disk this is a file URI.
	// params.textDocument.text the initial full content of the document.
	connection.console.log(`${params.textDocument.uri} opened.`)
})
connection.onDidChangeTextDocument((params) => {
	// The content of a text document did change in VSCode.
	// params.textDocument.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.
	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`)
})
connection.onDidCloseTextDocument((params) => {
	// A text document got closed in VSCode.
	// params.textDocument.uri uniquely identifies the document.
	connection.console.log(`${params.textDocument.uri} closed.`)
})
*/

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection)

// Listen on the connection
connection.listen()
