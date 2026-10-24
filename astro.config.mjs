import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sekkizguse.az',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Profil və idarəetmə səhifələri axtarışa düşmür
  integrations: [sitemap({ filter: (u) => !/\/hesab\/(idare\/)?$/.test(u) })],
});
