import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import'
import { configs as pluginTypescriptConfigs } from 'typescript-eslint'

// Constants

const PATTERN_JS = '**/*.{js,mjs,cjs}'
const PATTERN_TS = '**/*.{ts,mts,cts}'

const FILES_TS_ONLY = [PATTERN_TS]
const FILES_ALL = [PATTERN_JS, PATTERN_TS]

// Javascript Plugin

const rulesPluginJavascript = ruleNormalizer()({
  'no-useless-rename': 'on',
  'object-shorthand': 'on',
  'no-useless-concat': 'on',
  'prefer-template': 'on',
  eqeqeq: 'smart',
})

const configPluginJavascript = defineConfig({
  files: FILES_ALL,
  extends: [
    pluginJavascript.configs.recommended,
  ],
  rules: rulesPluginJavascript,
})

// Typescript Plugin

const rulesPluginTypescript = ruleNormalizer({ plugin: '@typescript-eslint' })({
  'array-type': { default: 'array-simple', readonly: 'array-simple' },
  'restrict-template-expressions': {
    allowNumber: true,
    allowBoolean: false,
    allowNullish: false,
    allowRegExp: false,
    allowArray: false,
    allowAny: false,
    allowNever: true,
  },
  'consistent-type-imports': 'on',
  'consistent-type-exports': 'on',
  'no-deprecated': 'off',
})

const configPluginTypescript = defineConfig({
  files: FILES_TS_ONLY,
  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
  extends: [
    pluginTypescriptConfigs.strictTypeChecked,
    pluginTypescriptConfigs.stylisticTypeChecked,
  ],
  rules: rulesPluginTypescript,
})

// Import Plugin

const rulesPluginImport = ruleNormalizer({ plugin: 'import' })({
  'consistent-type-specifier-style': 'prefer-top-level',
  'no-absolute-path': 'on',
  'no-cycle': 'on',
  'no-nodejs-modules': 'on',
  'no-useless-path-segments': 'on',
})

const configPluginImport = defineConfig({
  files: FILES_ALL,
  settings: { 'import/resolver': { typescript: true } },
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  extends: [
    pluginImportConfigs.recommended,
    pluginImportConfigs.typescript,
  ],
  rules: rulesPluginImport,
})

// Stylistic Plugin

const rulesPluginStylistic = ruleNormalizer({ plugin: '@stylistic' })({
  indent: ['on', 2],
  quotes: 'single',
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'on',
  'no-floating-decimal': 'off',
  'padded-blocks': 'off',
})

const configPluginStylistic = defineConfig({
  files: FILES_ALL,
  extends: [
    pluginStylistic.configs.customize({
      quotes: 'single',
      indent: 2,
      semi: false,
      arrowParens: true,
      quoteProps: 'as-needed',
      braceStyle: '1tbs',
      commaDangle: 'always-multiline',
      blockSpacing: true,
      jsx: false,
    }),
  ],
  rules: rulesPluginStylistic,
})

// Config

export default defineConfig(
  globalIgnores(['dist', 'coverage']),
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  configPluginJavascript,
  configPluginTypescript,
  configPluginImport,
  configPluginStylistic,
)

// Helpers

function ruleNormalizer({ severity: defaultSeverity = 'error', plugin: pluginName } = {}) {

  // Throw TypeError if default severity is not valid
  const isDefaultSeverity = (entry) => ['error', 'warn', 1, 2].includes(entry)
  if (!isDefaultSeverity(defaultSeverity)) throw new TypeError('Invalid default severity.')

  // User severity resolver
  const resolveSeverity = (entry) => {

    // Resolve to default severity if entry is "on" or true
    if (entry === 'on' || entry === true) return [true, defaultSeverity]

    // Resolve to "off" if entry is false or nullish
    if (entry === false || entry == null) return [true, 'off']

    // Resolve to entry if it's a valid severity
    return [entry === 'off' || entry === 0 || isDefaultSeverity(entry), entry]
  }

  // Rule entry normalizer
  const normalizeRuleEntry = (entry) => {

    // Return severity if it resolves to a valid severity
    const [isValidSeverity, severity] = resolveSeverity(entry)
    if (isValidSeverity) return severity

    // Process entry as array
    if (Array.isArray(entry)) {

      // Return default severity if array is empty
      if (!entry.length) return defaultSeverity

      // Return severity rule first element resolves to a valid severity
      const [first, ...rest] = entry
      const [isValidSeverity, severity] = resolveSeverity(first)
      if (isValidSeverity) return [severity, ...rest]

      // Return default severity rule with options
      return [defaultSeverity, ...entry]
    }

    // Return default severity rule with one option
    return [defaultSeverity, entry]
  }

  // Rule normalizer factory
  const createRuleNormalizer = (normalizeObjectEntry) => {
    return (rules) => {
      const entries = Object.entries(rules)
      const entriesNormalized = entries.map(normalizeObjectEntry)
      return Object.fromEntries(entriesNormalized)
    }
  }

  // Return simplified normalizer if no plugin defined
  if (!pluginName) {
    return createRuleNormalizer(
      ([ruleName, entry]) => [
        ruleName,
        normalizeRuleEntry(entry),
      ],
    )
  }

  // Declare plugin prefix
  const pluginPrefix = `${pluginName}/`

  // Rule name normalizer
  const normalizeRuleName = (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }

  // Return rule normalizer
  return createRuleNormalizer(
    ([ruleName, entry]) => [
      normalizeRuleName(ruleName),
      normalizeRuleEntry(entry),
    ],
  )

}
