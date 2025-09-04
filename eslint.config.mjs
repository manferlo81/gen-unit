import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import-x'
import { configs as pluginTypescriptConfigs } from 'typescript-eslint'

const javascriptPluginConfig = defineConfig(
  pluginJavascript.configs.recommended,
  normalizeRulesConfig({
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    eqeqeq: 'smart',
  }),
)

const importPluginConfig = defineConfig(
  pluginImportConfigs.recommended,
  pluginImportConfigs.typescript,
  normalizeRulesConfig('import-x', {
    'consistent-type-specifier-style': 'error',
    'no-useless-path-segments': 'error',
    'no-absolute-path': 'error',
    'no-cycle': 'error',
    'no-nodejs-modules': 'error',
  }),
)

const stylisticPluginConfig = defineConfig(
  pluginStylistic.configs.customize({
    indent: 2,
    semi: false,
    arrowParens: true,
    quoteProps: 'as-needed',
    braceStyle: '1tbs',
  }),
  normalizeRulesConfig('@stylistic', {
    quotes: 'single',
    'linebreak-style': 'unix',
    'no-extra-parens': 'all',
    'no-extra-semi': 'error',
    'no-floating-decimal': 'off',
    'padded-blocks': 'off',
  }),
)

const typescriptPluginConfig = defineConfig(
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  pluginTypescriptConfigs.strictTypeChecked,
  pluginTypescriptConfigs.stylisticTypeChecked,
  normalizeRulesConfig('@typescript-eslint', {
    'array-type': { default: 'array-simple', readonly: 'array-simple' },
    'restrict-template-expressions': {
      allowNumber: true,
      allowNever: true,
      allowBoolean: false,
      allowAny: false,
      allowNullish: false,
      allowRegExp: false,
      allowArray: false,
    },
  }),
  {
    ...pluginTypescriptConfigs.disableTypeChecked,
    files: ['**/*.{js,mjs,cjs}'],
  },
)

export default defineConfig(
  globalIgnores(['dist', 'coverage']),
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  javascriptPluginConfig,
  importPluginConfig,
  stylisticPluginConfig,
  typescriptPluginConfig,
)

function normalizeRulesConfig(pluginName, rules) {
  if (!rules && pluginName) return normalizeRulesConfig(null, pluginName)
  const entries = Object.entries(rules)
  if (!entries.length) return {}
  const normalizeEntry = createEntryNormalizer(pluginName)
  const entriesNormalized = entries.map(normalizeEntry)
  const rulesNormalized = Object.fromEntries(entriesNormalized)
  return { rules: rulesNormalized }
}

function createEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)]
  const normalizeRuleName = createPluginKeyNormalizer(pluginName)
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)]
}

function createPluginKeyNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`
  return (key) => {
    if (key.startsWith(pluginPrefix)) return key
    return `${pluginPrefix}${key}`
  }
}

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry
  if (['error', 'off', 'warn'].includes(entry)) return entry
  return ['error', entry]
}
