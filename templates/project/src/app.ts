import {
  currencies,
  defaultCurrency,
  languages,
  defaultLang,
  menus,
} from '@/config';

export const qiankun = {
  async mount(props: MasterProps) {
    const { updateConfig } = props;

    typeof updateConfig === 'function' &&
      updateConfig({
        currencies,
        defaultCurrency,
        languages,
        defaultLang,
        menus,
      });
  },
};
