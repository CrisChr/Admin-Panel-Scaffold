import * as t from '@babel/types';

declare global {
  //config typpings
  interface Config {
    projectName: string;
    languages: Language[];
    defaultLanguage: DefaultLanguage;
    currencies: Currency[];
    defaultCurrency: DefaultCurrency;
    menus: Menu[];
    pages: (OverviewPage | ListPage)[];
    statusTypes: {
      [status: string]: {
        display: string;
        type: 'warning' | 'success' | 'waiting' | 'failed' | 'error';
      };
    };
    homePagePath: string;
  }

  type Language =
    | {
        title: 'EN';
        key: 'en-US';
      }
    | {
        title: 'ID';
        key: 'id-ID';
      }
    | {
        title: 'VN';
        key: 'vi-VN';
      }
    | {
        title: 'ZH';
        key: 'zh-CN';
      };

  type DefaultLanguage = 'en-US' | 'id-ID' | 'vi-VN' | 'zh-CN';

  type Currency =
    | {
        title: 'USD';
        key: 'USD';
      }
    | {
        title: 'IDR';
        key: 'IDR';
      }
    | {
        title: 'CNY';
        key: 'CNY';
      }
    | {
        title: 'PHP';
        key: 'PHP';
      }
    | {
        title: 'VND';
        key: 'VND';
      }
    | {
        title: 'MYR';
        key: 'MYR';
      }
    | {
        title: 'THB';
        key: 'THB';
      }
    | {
        title: 'AUD';
        key: 'AUD';
      }
    | {
        title: string;
        key: string;
      };

  type DefaultCurrency =
    | 'USD'
    | 'CNY'
    | 'IDR'
    | 'PHP'
    | 'VND'
    | 'MYR'
    | 'THB'
    | 'AUD'
    | string;

  interface Menu {
    title: string;
    key: string;
    children: SubMenu[];
  }

  interface SubMenu {
    title: string;
    key: string;
    path: string;
    icon:
      | 'Policy'
      | 'Claim'
      | 'Overview'
      | 'Reimburse'
      | 'Insure'
      | 'Insurer'
      | 'Invoice'
      | 'Refund'
      | 'Bill'
      | 'Report'
      | 'Shop'
      | 'Quote';
    scopeKey?: string;
  }

  interface OverviewPage {
    type: 'overview';
    title: string;
    src: string;
    productName?: string;
  }

  interface ListPage {
    type: 'Policy' | 'Claim' | 'Reimburse' | 'Quote' | 'Insure' | string;
    columns: Column[];
    colMax?: number | null;
    noCustomize?: boolean;
    import?: {
      dataSource:
        | string
        | {
            label: string;
            value: string | number;
          }[];
      buttonText: string;
      accept: string;
    };
    keyDataIndex: string;
    filterConfig: Filter;
    listApi: string;
    detailApi: string;
    detail: DetailPage;
    productName?: string;
  }

  type DataIndex = string | string[];

  type DisplayMode =
    | 'text'
    | 'date'
    | 'date-hour'
    | 'amount'
    | 'status'
    | 'image'
    | 'documents'
    | 'date-range'
    | 'join';

  type PageType =
    | 'Policy'
    | 'Claim'
    | 'Overview'
    | 'Reimburse'
    | 'Insure'
    | 'Insurer'
    | 'Invoice'
    | 'Refund'
    | 'Bill'
    | 'Report'
    | 'Shop'
    | 'Quote'
    | string;

  interface Column {
    title: string;
    key: string;
    dataIndex: DataIndex;
    displayMode: DisplayMode;
    defaultShow?: boolean;
    sortable?: boolean;
  }

  interface Filter {
    showIdSelect?: boolean;
    showDefaultOptions?: boolean;
    idKeyTypes?: { label: string; value: string }[];
    idKeyTypeDefault?: string;
    searchInputDefault?: string;
    searchWithFilter?: boolean;
    deleteAllTagsType?: 'closeAllCanDelete' | 'restFilters';
    filterTitle?: string;
    placeholder?: string;
    filterItems?: (FilterDateItem | FilterSelectItem)[];
  }

  interface FilterDateItem {
    type: 'date';
    key: string;
    filterItemTitle: string;
    defaultValue?: 'lastDay' | 'last7Days' | 'lastMonth' | 'thisMonth';
    format?: string;
    canNotDelete?: boolean;
  }

  interface FilterSelectItem {
    filterItemTitle: string;
    type: 'mult' | 'single';
    key: string;
    options: { label: string; value: string | number | boolean; span?: 8 | 12 | 16 | 24 }[];
    defaultValue?: string | string[];
    disabled?: string[];
  }

  interface DetailItem {
    label: string;
    dataIndex: DataIndex;
    displayMode: DisplayMode;
    span?: 4 | 6 | 8 | 12 | 16 | 24;
  }

  interface CardGroup {
    type?: 'normal' | 'map';
    dataIndex?: DataIndex;
    label?: string;
    statusDataIndex?: DataIndex;
    items?: DetailItem[];
  }

  interface Card {
    statusDataIndex?: DataIndex;
    title: string;
    contentTitle?: string;
    groups?: CardGroup[];
    cards?: Card[];
  }

  interface DetailPage {
    idDataIndex: DataIndex;
    title?: string; // default title is `${pageName} ID: ${idValue}`
    statusDataIndex: DataIndex;
    message?: string;
    topItems?: DetailItem[];
    topGroups?: CardGroup[];
    cards?: Card[];
    buttons?: Button[];
  }

  interface Button {
    icon?: string;
    type: 'default' | 'primary' | 'green' | 'yellow' | 'red';
    text: string;
    href?: Href;
    modal?: ModalAction;
    action?: Action;
    status?: string[];
    scope?: string;
    operationName: string;
  }

  interface Href {
    link: string;
    pathParams?: {
      [key: string]: DataIndex;
    };
  }

  interface ModalAction extends Action {
    title: string;
    content?: ModalContentItem[];
    formItems?: ModalFormItem[];
    okText?: string;
    cancelText?: string;
    width?: number;
  }

  interface ModalContentItem {
    text: string;
    level:
      | 'h1'
      | 'h2'
      | 'h3a'
      | 'h3b'
      | 'h4'
      | 'h5'
      | 'number1'
      | 'number2'
      | 'body1'
      | 'body2'
      | 'body3'
      | 'caption1'
      | 'caption2'
      | 'caption3'
      | 'status'
      | 'link';
  }

  interface Action {
    api: string;
    method: 'post' | 'put' | string;
    params?: {
      [key: string]: DataIndex;
    };
    pathParams?: {
      [key: string]: DataIndex;
    };
    paramType: 'query' | 'body';
  }

  interface ModalFormItem {
    label: string;
    type: string;
    name: string;
    initialValue?: any;
    initialValueDataIndex?: DataIndex;
    fullRow?: boolean;
    halfRow?: boolean;
    [key: string]: any;
  }

  //processor typpings
  type AST = t.Node;

  abstract class Processor {
    constructor(ast: AST);
    ast?: AST;
    next?: Processor;
    run(): any;
    handleConfigs(): any;
  }

  abstract class Template {
    constructor(path: string, outputPath: string, config: Config);
    processor: Processor;
    ast?: AST;
    path?: string;
    outputPath?: string;
    config?: Config;
    parse(): void;
    generate(): void;
    run(): void;
    initProcessor(): void;
  }
}
