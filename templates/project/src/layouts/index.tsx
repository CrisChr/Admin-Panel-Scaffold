import React, { useEffect, useState, FC } from 'react';
import { useModel } from 'umi';
import { updateRequest, request } from '@/utils/request';
import { CurrencyContext, LocaleProvider } from 'iglooform';
import { defaultLang } from '@/config';
import { IntlProvider } from 'react-intl';
import { locales } from '@/locales';

const Layout: FC<any> = ({ children, location }) => {
  const {
    requestMethod,
    currentLang,
    exchange,
    exchangeBack,
    uploadMethod,
  } = useModel('@@qiankunStateFromMaster');

  useEffect(() => {
    updateRequest(requestMethod, uploadMethod);
  }, [requestMethod, uploadMethod]);

  return (
    <IntlProvider
      locale={currentLang || defaultLang}
      messages={locales[currentLang] || locales[defaultLang]}
    >
      <LocaleProvider currentLang={currentLang || defaultLang}>
        <CurrencyContext.Provider value={{ exchange, exchangeBack }}>
          {Boolean(request) ? children : null}
        </CurrencyContext.Provider>
      </LocaleProvider>
    </IntlProvider>
  );
};
export default Layout;
