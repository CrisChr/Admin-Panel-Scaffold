declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare type UpdateConfigFunction = (props: UpdateConfigProps) => any;
declare type UpdateLanguageFunction = (props: {
  languages: LanguageOption[];
  defaultLang: string;
}) => any;
declare type UpdateCurrencyFunction = (props: {
  currencies: CurrencyOption[];
  defaultCurrency: string;
}) => any;
declare type ExchangeFunction = (amount: number) => any;
declare type ExchangeBackFunction = (amount: number) => any;

declare type UploadMethod = (
  dataSource: string,
  file: File,
  enableApiAuth: boolean,
  onProgess: (e: ProgressEvent) => any,
) => {
  abort: () => any;
  result: Promise<{
    success: boolean;
    errorMessage?: string;
  }>;
};

declare type LanguageOption = {
  key: string;
  title: string;
};

declare type CurrencyOption = {
  key: string;
  title: string;
};

declare type ExchangeRate = {
  [from: string]: {
    [to: string]: number;
  };
};

declare type Menu = {
  children: MenuItem[];
  title: string;
  key?: string;
};

declare type MenuItem = {
  title: string;
  key: string;
  path: string;
  icon: string;
  scopeKey?: string;
  inline?: boolean;
};

declare type HomeMenu = {
  label?: string;
  title?: string;
  onClick?: (props: any) => any;
};

declare type Scope = {
  [key: string]: boolean;
};

declare interface MasterProps {
  currentLang?: string | null;
  currentCurrency?: string | null;
  scope?: Scope;
  token?: string | null;
  exchangeRage?: ExchangeRate;
  locale?: string | null;
  updateConfig: UpdateConfigFunction;
  updateLanguage: UpdateLanguageFunction;
  updateCurrency: UpdateCurrencyFunction;
  exchange: ExchangeFunction;
  exchangeBack: ExchangeBackFunction;
  requestMethod: any;
  requestErrorHandler: (props: any) => any;
  uploadMethod: UploadMethod;
  logout: () => any;
}

declare interface UpdateConfigProps {
  languages: LanguageOption[];
  defaultLang: string;
  currencies: CurrencyOption[];
  defaultCurrency: string;
  menus: Menu[];
  homeMenus?: HomeMenu[];
  siderSimpleLayout?: string[];
  headerSimpleLayout?: string[];
}

declare interface CommonState<T, U> {
  page: number;
  pageSize: number;
  list: T[];
  total: number;
  detailId?: string;
  detail?: U;
}

declare type StateWithLoading<T, U> = CommonState<T, U> & {
  loading: boolean;
};

declare interface GlobalState {
  loading: {
    effects: {
      [key: string]: boolean;
    };
  };
}
