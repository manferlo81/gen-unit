import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry;
  const severities = ['error', 'warn', 'off'];
  if (severities.includes(entry)) return entry;
  return ['error', entry];
}

function normalizeRuleEntries(rules, pluginName) {
  const entries = Object.entries(rules).map(
    ([ruleName, ruleEntry]) => [ruleName, normalizeRuleEntry(ruleEntry)],
  );
  if (!pluginName) return Object.fromEntries(entries);
  const pluginPrefix = `${pluginName}/`;
  const normalizeRuleName = (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName;
    return `${pluginPrefix}${ruleName}`;
  };
  return Object.fromEntries(
    entries.map(
      ([ruleName, normalizedRuleEntry]) => [normalizeRuleName(ruleName), normalizedRuleEntry],
    ),
  );
}

function normalizeRules(pluginOrRules, rules) {
  if (typeof pluginOrRules !== 'string') return normalizeRuleEntries(pluginOrRules);
  return normalizeRuleEntries(rules, pluginOrRules);
}

const eslintRules = normalizeRules({
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
});

const stylisticRules = normalizeRules('@stylistic', {
  indent: 2,
  'linebreak-style': 'unix',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'no-floating-decimal': 'off',
  'padded-blocks': 'off',
});

const typescriptRules = normalizeRules('@typescript-eslint', {
  'array-type': {
    default: 'array-simple',
    readonly: 'array-simple',
  },
  'restrict-template-expressions': 'off',
});

const stylisticPluginConfig = stylistic.configs.customize({
  semi: true,
  quoteProps: 'as-needed',
  arrowParens: true,
});

const typescriptPluginConfig = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: ['**/*.{js,cjs,mjs}'], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { files: ['**/*.{js,cjs,mjs,ts}'] },
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  js.configs.recommended,
  stylisticPluginConfig,
  ...typescriptPluginConfig,
  { rules: { ...eslintRules, ...stylisticRules, ...typescriptRules } },
);
