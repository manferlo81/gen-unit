import pluginJavascript from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const javascriptPluginConfig = config({
  extends: [pluginJavascript.configs.recommended],
  rules: normalizeRules({
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'no-useless-concat': 'error',
    'prefer-template': 'error',
  }),
});

const stylisticPluginConfig = config({
  extends: [
    pluginStylistic.configs.customize({
      quotes: 'single',
      indent: 2,
      semi: true,
      arrowParens: true,
      quoteProps: 'as-needed',
      braceStyle: '1tbs',
    }),
  ],
  rules: normalizeRules('@stylistic', {
    'linebreak-style': 'unix',
    'no-extra-parens': 'all',
    'no-extra-semi': 'error',
    'no-floating-decimal': 'off',
    'padded-blocks': 'off',
  }),
});

const typescriptPluginConfig = config({
  files: ['**/*.ts'],
  extends: [
    typescriptConfigs.strictTypeChecked,
    typescriptConfigs.stylisticTypeChecked,
  ],
  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } },
  rules: normalizeRules('@typescript-eslint', {
    'array-type': {
      default: 'array-simple',
      readonly: 'array-simple',
    },
    'restrict-template-expressions': 'off',
  }),
});

export default config(
  {
    files: ['**/*.{js,cjs,mjs,ts}'],
    ignores: ['dist', 'coverage'],
    extends: [
      javascriptPluginConfig,
      stylisticPluginConfig,
    ],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  typescriptPluginConfig,
);

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry;
  if (['error', 'warn', 'off'].includes(entry)) return entry;
  return ['error', entry];
}

function createPluginRuleNameNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`;
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName;
    return `${pluginPrefix}${ruleName}`;
  };
}

function createEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)];
  const normalizeRuleName = createPluginRuleNameNormalizer(pluginName);
  return ([ruleName, ruleEntry]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleEntry)];
}

function normalizeRules(pluginName, rules) {
  if (!rules && pluginName) return normalizeRules(null, pluginName);
  const normalizeEntry = createEntryNormalizer(pluginName);
  return Object.fromEntries(Object.entries(rules).map(normalizeEntry));
}
