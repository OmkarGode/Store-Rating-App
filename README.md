
<img width="832" height="745" alt="Screenshot 2025-12-12 210943" src="https://github.com/user-attachments/assets/2662dbfc-7df9-435e-904a-43317f740cd3" />
<img width="1891" height="884" alt="Screenshot 2025-12-12 211046" src="https://github.com/user-attachments/assets/1f5a84fc-7664-4903-bc55-278160619ff6" /> 
<img width="1891" height="883" alt="Screenshot 2025-12-12 211046" src="https://github.com/user-attachments/assets/a0f0c93e-b58a-4d5d-a9a4-7899a883611c" />
<img width="1910" height="880" alt="Screenshot 2025-12-12 211121" src="https://github.com/user-attachments/assets/8573a177-a4e4-4d09-ba04-92d783bd2810" />
<img width="1910" height="880" alt="Screenshot 2025-12-12 211121" src="https://github.com/user-attachments/assets/84d5c5dd-30df-4173-a63e-4e74131249ce" />  
<img width="1911" height="767" alt="Screenshot 2025-12-12 211209" src="https://github.com/user-attachments/assets/fc475e28-129a-4a45-8fe2-4fef52063601" />
<img width="1911" height="767" alt="Screenshot 2025-12-12 211209" src="https://github.com/user-attachments/assets/a5313450-6231-40cb-99c9-b10414157309" />
<img width="1916" height="765" alt="Screenshot 2025-12-12 211302" src="https://github.com/user-attachments/assets/e8776028-8efd-4c9a-84b7-a09a67cd691a" />
<img width="1916" height="765" alt="Screenshot 2025-12-12 211302" src="https://github.com/user-attachments/assets/7d86fde3-2667-480f-bbce-43965b6ff9c5" />


Demo (https://drive.google.com/drive/folders/1uqKh00Sycaixb18ZINbGk_FF-8aeOvDD?usp=sharing)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# Demo Id and Password for login :
User:  user@gmail.com   
Owner: owner@gmail.com
Admin: admin@gmail.com

Password : Pass@123  (same for all) 

