import { Problem } from 'wollok-ts'
import { lang } from './settings'

// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// VALIDATION MESSAGES DEFINITION
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════

type ValidationMessage = { [key: string]: string }

const FAILURE = 'failure'

const validationMessagesEn: ValidationMessage = {
  'nameShouldBeginWithLowercase': 'The name {0} must start with lowercase',
  'nameShouldBeginWithUppercase': 'The name {0} must start with uppercase',
  'nameShouldNotBeKeyword': 'The name {0} is a keyword, you should pick another one',
  'shouldNotBeEmpty': 'Should not make an empty definition.',
  'shouldUseConditionalExpression': 'Bad usage of if! You must return the condition itself without using if.',
  'shouldPassValuesToAllAttributes' : 'Reference {0} not found in {1}',
  'namedArgumentShouldExist' : 'Reference {0} not found in {1}',
  'linearizationShouldNotRepeatNamedArguments' : 'Reference {0} is initialized more than once',
  'namedArgumentShouldNotAppearMoreThanOnce' : 'Reference {0} is initialized more than once',
  'shouldInitializeAllAttributes' : 'You must provide initial value to the following references: {0}',
  'shouldImplementAllMethodsInHierarchy' : 'Inconsistent hierarchy. Methods on mixins without super implementation on hierarchy',
  'shouldUseSelfAndNotSingletonReference' : 'Don\'t use the name within the object. Use \'self\' instead.',
  'shouldNotReassignConst' : 'Cannot modify constants',
  'shouldNotHaveLoopInHierarchy' : 'Infinite Cycle hierarchy',
  'shouldOnlyInheritFromMixin' : 'Mixin can only inherit from another mixin',
  'shouldNotDefineMoreThanOneSuperclass' : 'Bad Linearization: you cannot define multiple parent classes',
  'superclassShouldBeLastInLinearization' : 'Bad Linearization: superclass should be last in linearization',
  'shouldNotUseOverride' : 'Method does not override anything',
  'possiblyReturningBlock' : 'This method is returning a block, consider removing the \'=\' before curly braces.',
  'shouldUseOverrideKeyword' : 'Method should be marked as override, since it overrides a superclass method',
  'shouldMatchSuperclassReturnValue' : 'TODO',
  'getterMethodShouldReturnAValue' : 'Getter should return a value',
  'methodShouldHaveDifferentSignature' : 'Duplicated method',
  'shouldNotDuplicateVariables' : 'There is already a variable with this name in the hierarchy',
  'shouldNotDuplicateFields' : 'There is already a field with this name in the hierarchy',
  'shouldNotDuplicateLocalVariables' : 'There is already a variable with this name in the hierarchy',
  'shouldNotDuplicateGlobalDefinitions' : 'There is already a definition with this name in the hierarchy',
  'shouldNotDuplicateVariablesInLinearization' : 'There are attributes with the same name in the hierarchy: [{0}]',
  'shouldNotDuplicateEntities' : 'This name is already defined (imported from {0})',
  'shouldNotImportSameFile' : 'Cannot import same file',
  'shouldNotImportMoreThanOnce' : 'This file is already imported',
  'parameterShouldNotDuplicateExistingVariable' : 'Duplicated Name',
  'methodShouldExist' : 'Method does not exist or invalid number of arguments',
  'shouldImplementAbstractMethods' : 'You must implement all inherited abstract methods',
  'shouldNotUseVoidMethodAsValue' : 'Message send "{0}" produces no value (missing return in method?)',
  'shouldInitializeGlobalReference' : 'Reference is never initialized',
  'shouldNotDefineUnusedVariables' : 'Unused variable',
  'shouldNotDefineGlobalMutableVariables' : 'Global variables are not allowed',
  'shouldDefineConstInsteadOfVar' : 'Variable should be const',
  'shouldNotCompareEqualityOfSingleton' : 'TODO',
  'shouldUseBooleanValueInIfCondition' : 'Expecting a boolean',
  'shouldUseBooleanValueInLogicOperation' : 'Expecting a boolean',
  'shouldNotDefineUnnecesaryIf' : 'Unnecessary if always evaluates to true!',
  'codeShouldBeReachable' : 'Unreachable code',
  'shouldNotDefineUnnecessaryCondition' : 'Unnecessary condition',
  'shouldCatchUsingExceptionHierarchy' : 'Can only catch wollok.lang.Exception or a subclass of it',
  'catchShouldBeReachable' : 'Unreachable catch block',
  'shouldNotUseReservedWords' : '{0} is a reserved name for a core element',
  'shouldNotDuplicatePackageName' : 'Duplicated package',
  'shouldMatchFileExtension' : 'TODO',
  'shouldHaveNonEmptyName' : 'Tests must have a non-empty description',
  'shouldHaveAssertInTest' : 'Tests must send at least one message to assert object',
  'overridingMethodShouldHaveABody' : 'Overriding method must have a body',
  'shouldNotDefineEmptyDescribe' : 'Describe should not be empty',
  'shouldNotMarkMoreThanOneOnlyTest' : 'You should mark a single test with the flag \'only\' (the others will not be executed)',
  [FAILURE]: 'Rule failure: ',
}

const validationMessagesEs: ValidationMessage = {
  'nameShouldBeginWithLowercase': 'El nombre {0} debe comenzar con minúsculas',
  'nameShouldBeginWithUppercase': 'El nombre {0} debe comenzar con mayúsculas',
  'nameShouldNotBeKeyword': 'El nombre {0} es una palabra reservada, debe cambiarla',
  'shouldNotBeEmpty': 'El elemento no puede estar vacío: falta escribir código.',
  'shouldUseConditionalExpression': 'Estás usando incorrectamente el if. Devolvé simplemente la expresión booleana.',
  'shouldPassValuesToAllAttributes' : 'No se encuentra la referencia {0} en {1}',
  'namedArgumentShouldExist' : 'No se encuentra la referencia {0} en {1}',
  'linearizationShouldNotRepeatNamedArguments' : 'La referencia {0} está inicializada m\u00E1s de una vez',
  'namedArgumentShouldNotAppearMoreThanOnce' : 'La referencia {0} está inicializada m\u00E1s de una vez',
  'shouldInitializeAllAttributes' : 'Debe proveer un valor inicial a las siguientes referencias: {0}',
  'shouldImplementAllMethodsInHierarchy' : 'Jerarqu\u00EDa inconsistente. Existen m\u00E9todos en mixins que requieren implementaci\u00F3n en super',
  'shouldUseSelfAndNotSingletonReference' : 'No debe usar el nombre del objeto dentro del mismo. Use \'self\'.',
  'shouldNotReassignConst' : 'No se pueden modificar las referencias constantes',
  'shouldNotHaveLoopInHierarchy' : 'La jerarqu\u00EDa de clases produce un ciclo infinito',
  'shouldOnlyInheritFromMixin' : 'Los mixines solo pueden heredar de otros mixines',
  'shouldNotDefineMoreThanOneSuperclass' : 'Linearizaci\u00F3n: no se puede definir m\u00E1s de una superclase',
  'superclassShouldBeLastInLinearization' : 'Linearizaci\u00F3n: la superclase deber\u00EDa estar \u00FAltima en linearizaci\u00F3n',
  'shouldNotUseOverride' : 'Este m\u00E9todo no sobrescribe ning\u00FAn m\u00E9todo',
  'possiblyReturningBlock' : 'Este m\u00E9todo devuelve un bloque, si no es la intenci\u00F3n elimine el \'=\' antes de las llaves.',
  'shouldUseOverrideKeyword' : 'Deber\u00EDa marcarse el m\u00E9todo con \'override\', ya que sobrescribe el de sus superclases',
  'shouldMatchSuperclassReturnValue' : 'Debe retornar un valor ya que el m\u00E9todo sobrescrito retorna un valor',
  'getterMethodShouldReturnAValue' : 'Getter debe retornar un valor',
  'methodShouldHaveDifferentSignature' : 'M\u00E9todo duplicado',
  'shouldNotDuplicateVariables' : 'Ya existe una variable con este nombre en la jerarqu\u00EDa',
  'shouldNotDuplicateFields' : 'Ya existe un atributo con este nombre en la jerarqu\u00EDa',
  'shouldNotDuplicateLocalVariables' : 'Ya existe una variable con este nombre en la jerarqu\u00EDa',
  'shouldNotDuplicateGlobalDefinitions' : 'Ya existe una definicion con este nombre en la jerarqu\u00EDa',
  'shouldNotDuplicateVariablesInLinearization' : 'En la jerarqu\u00EDa hay atributos con el mismo nombre: [{0}]',
  'shouldNotDuplicateEntities' : 'Este nombre ya está definido (importado de {0})',
  'shouldNotImportSameFile' : 'No se puede importar el mismo archivo',
  'shouldNotImportMoreThanOnce' : 'Este archivo ya est\u00E1 importado',
  'parameterShouldNotDuplicateExistingVariable' : 'Nombre duplicado',
  'methodShouldExist' : 'El m\u00E9todo no existe o n\u00FAmero incorrecto de argumentos',
  'shouldImplementAbstractMethods' : 'Debe implementar todos los m\u00E9todos abstractos heredados',
  'shouldNotUseVoidMethodAsValue' : 'El mensaje "{0}" no retorna ning\u00FAn valor (quiz\u00E1s te falte un return en el m\u00E9todo)',
  'shouldInitializeGlobalReference' : 'La referencia nunca se inicializa',
  'shouldNotDefineUnusedVariables' : 'Esta variable nunca se utiliza',
  'shouldNotDefineGlobalMutableVariables' : 'No se permiten las variables globales',
  'shouldDefineConstInsteadOfVar' : 'Esta variable debería ser una constante',
  'shouldNotCompareEqualityOfSingleton' : 'TODO',
  'shouldUseBooleanValueInIfCondition' : 'Se espera un booleano',
  'shouldUseBooleanValueInLogicOperation' : 'Se espera un booleano',
  'shouldNotDefineUnnecesaryIf' : 'If innecesario. Siempre se eval\u00FAa como verdadero',
  'codeShouldBeReachable' : 'Este c\u00F3digo nunca se va a ejecutar',
  'shouldNotDefineUnnecessaryCondition' : 'Condici\u00F3n innecesaria',
  'shouldCatchUsingExceptionHierarchy' : 'Solo se puede aplicar \'catch\' a un objeto de tipo wollok.lang.Exception o una subclase',
  'catchShouldBeReachable' : 'Este catch nunca se va a ejecutar debido a otro catch anterior',
  'shouldNotUseReservedWords' : '{0} es una palabra reservada por la biblioteca de Wollok',
  'shouldNotDuplicatePackageName' : 'Package duplicado',
  'shouldMatchFileExtension' : 'TODO',
  'shouldHaveNonEmptyName' : 'Los tests deben tener una descripci\u00F3n no vac\u00EDa',
  'shouldHaveAssertInTest' : 'Los tests deben enviar al menos un mensaje al WKO "assert"',
  'overridingMethodShouldHaveABody' : 'Si sobrescribe debe especificar el cuerpo del m\u00E9todo',
  'shouldNotDefineEmptyDescribe' : 'El describe no deber\u00EDa estar vac\u00EDo',
  'shouldNotMarkMoreThanOneOnlyTest' : 'Solo un test puede marcarse como \'only\' (los otros no se ejecutar\u00E1n)',
  [FAILURE]: 'La siguiente regla falló: ',
}

const validationMessages: { [key: string]: ValidationMessage } = {
  'en': validationMessagesEn,
  'es': validationMessagesEs,
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// INTERNAL FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════

const convertToHumanReadable = (code: string) => {
  if (!code) { return '' }
  const result = code.replace(/[A-Z0-9]+/g, (match) => ' ' + match.toLowerCase())
  return validationI18nized()[FAILURE] + result.charAt(0).toUpperCase() + result.slice(1, result.length)
}

const interpolateValidationMessage = (message: string, ...values: string[]) =>
  message.replace(/{\d*}/g, (match: string) => {
    const index = match.replace('{', '').replace('}', '') as unknown as number
    return values[index] || ''
  }
  )

const getBasicMessage = (problem: Problem) => validationI18nized()[problem.code] || convertToHumanReadable(problem.code)

const validationI18nized = () =>
  validationMessages[lang()] as ValidationMessage

// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// PUBLIC INTERFACE
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════

export const reportMessage = (problem: Problem): string => interpolateValidationMessage(getBasicMessage(problem))
