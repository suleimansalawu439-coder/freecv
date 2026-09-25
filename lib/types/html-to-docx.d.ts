declare module 'html-to-docx' {
  export interface HtmlToDocxMargins {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    header?: number;
    footer?: number;
    gutter?: number;
  }
  export interface HtmlToDocxOptions {
    orientation?: 'portrait' | 'landscape';
    pageSize?: { width?: number; height?: number };
    margins?: HtmlToDocxMargins;
    title?: string;
    subject?: string;
    creator?: string;
    keywords?: string[];
    description?: string;
    lastModifiedBy?: string;
    header?: boolean;
    footer?: boolean;
    font?: string;
    fontSize?: number;
    lang?: string;
    decodeUnicode?: boolean;
    table?: { row?: { cantSplit?: boolean } };
    numbering?: { defaultOrderedListStyleType?: string };
  }
  export default function HTMLtoDOCX(
    htmlString: string,
    headerHTMLString?: string | null,
    documentOptions?: HtmlToDocxOptions,
    footerHTMLString?: string | null
  ): Promise<Buffer>;
}
