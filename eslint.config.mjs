import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const normalizeRuleEntry = (entry) => {
  if (Array.isArray(entry)) return entry;
  if (['error', 'warn', 'off'].includes(entry)) return entry;
  return ['error', entry];
};

const normalizePluginRuleName = (pluginName, ruleName) => {
  if (!pluginName) return ruleName;
  const pluginPrefix = `${pluginName}/`;
  if (ruleName.startsWith(pluginPrefix)) return ruleName;
  return `${pluginPrefix}${ruleName}`;
};

const pluginRules = (pluginName, rules) => Object.fromEntries(
  Object.entries(rules).map(([ruleName, ruleEntry]) => {
    return [normalizePluginRuleName(pluginName, ruleName), normalizeRuleEntry(ruleEntry)];
  }),
);

const eslintRules = pluginRules(null, {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
});

const stylisticRules = pluginRules('@stylistic', {
  semi: 'always',
  indent: 2,
  quotes: 'single',
  'linebreak-style': 'unix',

  'quote-props': 'as-needed',
  'arrow-parens': 'always',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',

  'member-delimiter-style': {},
  'no-floating-decimal': 'off',
  'padded-blocks': 'off',
});

const typescriptRules = pluginRules('@typescript-eslint', {
  'array-type': {
    default: 'array-simple',
    readonly: 'array-simple',
  },
  'restrict-template-expressions': 'off',
});

const javascriptExtensions = ['js', 'cjs', 'mjs'].join(',');

const typescriptFlatConfigs = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: [`**/*.{${javascriptExtensions}}`], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { files: [`**/*.{${javascriptExtensions},ts}`] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  stylistic.configs['recommended-flat'],
  ...typescriptFlatConfigs,
  { rules: { ...eslintRules, ...typescriptRules, ...stylisticRules } },
);
