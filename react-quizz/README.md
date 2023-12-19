## 2 ramas de la aplicación.

una sin usar Context y la otra usando Context

## Podemos hacer una versión del trivial con esta api.

https://the-trivia-api.com/v2/questions?limit=15&difficulties=easy
Más info y documentación en: https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-  Configure the top-level `parserOptions` property like this:

```js
export default {
	// other rules...
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname
	}
};
```

-  Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-  Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-  Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
