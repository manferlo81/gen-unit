import pluginJavascript from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import { config, configs as pluginTypescriptConfigs } from 'typescript-eslint'

const javascriptPluginConfig = config(
  pluginJavascript.configs.recommended,
  normalizeRules({
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    eqeqeq: 'smart',
  }),
)

const stylisticPluginConfig = config(
  pluginStylistic.configs.customize({
    indent: 2,
    semi: false,
    arrowParens: true,
    quoteProps: 'as-needed',
    braceStyle: '1tbs',
  }),
  normalizeRules('@stylistic', {
    quotes: 'single',
    'linebreak-style': 'unix',
    'no-extra-parens': 'all',
    'no-extra-semi': 'error',
    'no-floating-decimal': 'off',
    'padded-blocks': 'off',
  }),
)

const typescriptPluginConfig = config(
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  pluginTypescriptConfigs.strictTypeChecked,
  pluginTypescriptConfigs.stylisticTypeChecked,
  normalizeRules('@typescript-eslint', {
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

export default config(
  { ignores: ['dist', 'coverage'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  javascriptPluginConfig,
  stylisticPluginConfig,
  typescriptPluginConfig,
)

function normalizeRules(pluginName, rules) {
  if (!rules && pluginName) return normalizeRules(null, pluginName)
  const entries = Object.entries(rules)
  if (!entries.length) return {}
  const normalizeEntry = createEntryNormalizer(pluginName)
  const entriesNormalized = entries.map(normalizeEntry)
  const rulesNormalized = Object.fromEntries(entriesNormalized)
  return { rules: rulesNormalized }
}

function createEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)]
  const normalizeRuleName = createPluginRuleNameNormalizer(pluginName)
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)]
}

function createPluginRuleNameNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName
    return `${pluginPrefix}${ruleName}`
  }
}

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry
  if (['error', 'off', 'warn'].includes(entry)) return entry
  return ['error', entry]
}
