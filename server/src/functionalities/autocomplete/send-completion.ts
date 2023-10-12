import { CompletionItem } from 'vscode-languageserver'
import { Describe, Environment, Literal, Method, Node, Reference, Singleton } from 'wollok-ts'
import { is, List } from 'wollok-ts/dist/extensions'
import { literalValueToClass } from '../../utils/vm/wollok'
import { methodCompletionItem } from './autocomplete'

export function completeMessages(environment: Environment, node: Node): CompletionItem[] {
  return methodPool(environment, node).map(method => methodCompletionItem(node, method))
}

function methodPool(environment: Environment, node: Node): List<Method> {
  if(node.is(Reference) && node.target?.is(Singleton)) {
    return node.target.allMethods
  }
  if(node.is(Literal)){
    return literalMethods(environment, node)
  }
  return allPossibleMethods(environment, node)
}

function literalMethods(environment: Environment, literal: Literal){
  return literalValueToClass(environment, literal.value).allMethods
}

const isSymbol = (message: string) => /^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑäëïöüàèìòù]+$/g.test(message)

function availableAtAutocomplete(method: Method, node: Node) {
  return method.sourceFileName && !['wollok/vm.wlk', 'wollok/mirror.wlk'].includes(method.sourceFileName) && !isSymbol(method.name) && method.name !== '<apply>' && (!method.parent.is(Describe) || node.ancestors.some(is(Describe)))
}

function allPossibleMethods(environment: Environment, node: Node): Method[] {
  return (environment.descendants.filter(is(Method)) as Method[]).filter(method => availableAtAutocomplete(method, node))
}