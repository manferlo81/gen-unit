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

  const isSeverityString = (entry) => ['error', 'off', 'warn'].includes(entry)

  const resolveSeverity = (entry) => {
    if (entry === true || entry === 'on') return [true, defaultSeverity]
    if (entry === false || entry == null) return [true, 'off']
    return [isSeverityString(entry), entry]
  }

  const normalizeRuleEntry = (entry) => {

    const [isSeverity, severity] = resolveSeverity(entry)
    if (isSeverity) return severity

    if (Array.isArray(entry)) {
      if (!entry.length) return defaultSeverity
      const [first, ...rest] = entry
      const [isSeverity, severity] = resolveSeverity(first)
      if (isSeverity) return [severity, ...rest]
      return [defaultSeverity, ...entry]
    }

    return [defaultSeverity, entry]
  }

  const createRuleNormalizer = (normalizeEntry) => {
    return (rules) => {
      const entries = Object.entries(rules)
      const entriesNormalized = entries.map(normalizeEntry)
      return Object.fromEntries(entriesNormalized)
    }
  }

  if (!pluginName) {
    return createRuleNormalizer(
      ([ruleName, ruleEntry]) => [
        ruleName,
        normalizeRuleEntry(ruleEntry),
      ],
    )
  }

  const pluginPrefix = `${pluginName}/`

  const normalizeRuleName = (key) => {
    if (key.startsWith(pluginPrefix)) return key
    return `${pluginPrefix}${key}`
  }

  return createRuleNormalizer(
    ([ruleName, ruleEntry]) => [
      normalizeRuleName(ruleName),
      normalizeRuleEntry(ruleEntry),
    ],
  )

}
