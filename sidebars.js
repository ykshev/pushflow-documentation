module.exports = {
  ru: [
    'ru/quickstart',
    {
      type: 'category',
      label: 'Сбор подписок',
      items: ['ru/feed', 'ru/feed_collect', 'ru/sdk', 'ru/feed_carosule', 'ru/cookbook', 'ru/pricing'],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Интеграции',
      items: ['ru/tracker', 'ru/binom'],
      collapsed: false
    },
    // {
    //   type: 'category',
    //   label: 'Отправка уведомлений',
    //   items: ['campaign', 'creative'],
    //   collapsed: false
    // },
  ],
  en: [
    'en/quickstart',
    {
      type: 'category',
      label: 'Collecting subscriptions',
      items: ['en/feed', 'en/feed_collect', 'en/sdk', 'en/feed_carosule', 'en/cookbook', 'en/pricing'],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Integrations',
      items: ['en/tracker', 'en/binom'],
      collapsed: false
    },
    // {
    //   type: 'category',
    //   label: 'Отправка уведомлений',
    //   items: ['campaign', 'creative'],
    //   collapsed: false
    // },
  ]
};
