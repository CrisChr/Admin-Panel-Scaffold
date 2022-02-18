import { MenuIcon } from 'iglooicon';

module.exports = {
  projectName: 'Agency Platform',
  languages: [
    {
      title: 'EN',
      key: 'en-US'
    }
  ],
  defaultLanguage: 'en-US',
  currencies: [
    {
      title: 'MYR',
      key: 'MYR'
    }
  ],
  defaultCurrency: 'MYR',
  homePagePath: '/agent',
  menus: [
    {
      title: 'Agency',
      key: 'Agency',
      children: [
        {
          title: 'Agent',
          key: '/agent',
          path: '/agent',
          icon: MenuIcon.Partner,
          scopeKey: 'debug'
        },
        {
          title: 'Quotation',
          key: '/quotation',
          path: '/quotation',
          icon: MenuIcon.Template,
          scopeKey: 'debug'
        },
        {
          title: 'Withdrawal',
          key: '/withdrawal',
          path: 'withdrawal',
          icon: MenuIcon.Bill,
          scopeKey: 'debug'
        }
      ]
    }
  ]
}