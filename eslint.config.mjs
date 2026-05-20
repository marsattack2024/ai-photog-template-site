import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      // Stray generated types from a prior react-router install — not used at runtime
      ".react-router/**",
    ],
  },
  {
    rules: {
      "@next/next/no-img-element": "error",
    },
  },
];

export default config;
