
module.exports = {
  projectName: 'agency-platform',
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
          icon: 'Partner',
          scopeKey: 'debug'
        },
        {
          title: 'Quotation',
          key: '/quotation',
          path: '/quotation',
          icon: 'Template',
          scopeKey: 'debug'
        },
        {
          title: 'Withdrawal',
          key: '/withdrawal',
          path: 'withdrawal',
          icon: 'Bill',
          scopeKey: 'debug'
        }
      ]
    }
  ],
  pages: [
    {
      type: 'Agent',
      listApi: '/v1/agency-platform-id/admin/users',
    },
    {
      type: 'Quotation',
      listApi: '/v1/agency-platform-id/admin/quotations',
    },
    {
      type: 'Withdrawal',
      listApi: '/v1/agency-platform-id/admin/withdrawals',
    }
  ]
}