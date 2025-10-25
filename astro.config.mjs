// @ts-check
import { defineConfig } from "astro/config";
import starlightThemeObsidian from "starlight-theme-obsidian";
import starlight from "@astrojs/starlight";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  outDir: "dist",
  integrations: [
    starlight({
      plugins: [
        starlightThemeObsidian({
          graph: false,
        }),
      ],
      title: "Tensamin",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Tensamin",
        },
        {
          icon: "external",
          label: "Website",
          href: "https://tensamin.net",
        },
      ],
      sidebar: [
        "index",
        "installation",
        {
          label: "Components",
          items: [
            { label: "Iota", autogenerate: { directory: "components/iota" } },
            {
              label: "Omikron",
              autogenerate: { directory: "components/omikron" },
            },
            { label: "Omega", autogenerate: { directory: "components/omega" } },
            {
              label: "Frontend",
              autogenerate: { directory: "components/frontend" },
            },
            {
              label: "Auth Server",
              autogenerate: { directory: "components/auth-server" },
            },
          ],
        },
        { label: "Security", autogenerate: { directory: "security" } },
        { label: "Legal", autogenerate: { directory: "legal" } },
      ],
    }),
    mdx(),
  ],
});
