module.exports = {
  title: 'Pushflow документация',
  tagline: 'Собирай пуш-подписки с pushflow',
  url: 'https://pushflow.com/',
  baseUrl: '/docs/',
  favicon: 'https://pushflow.net/favicon.svg',
  organizationName: 'pushflow', // Usually your GitHub org/user name.
  projectName: 'pushflow', // Usually your repo name.
  themeConfig: {
    navbar: {
      // title: 'Docs',
      logo: {
        alt: 'Pushflow Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: '/',
          // activeBasePath: 'en',
          label: 'In English',
          position: 'left',
        },
        {

          label: 'По-русски',
          position: 'left',
          to: 'ru/quickstart',
          activeBasePath: 'ru',
          // items: [
          //   {
          //     to: 'ru/quickstart',
          //     activeBasePath: 'ru',
          //     label: 'Документация',
          //   },
          //   {
          //     to: 'blog',
          //     // activeBasePath: 'glaze/overview',
          //     label: 'Блог',
          //   },
          // ],
        },

        {
          to: 'support',
          label: 'Contact support',
          position: 'right',
        },

        // { to: 'blog', label: 'Блог', position: 'right' },
        {
          href: 'https://pushflow.net/app/',
          label: 'Back to Pushflow',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pushflow.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // homePageId: 'quickstart',

          routeBasePath: '',
          homePageId: 'en/quickstart',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

};
