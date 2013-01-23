declare interface JQuery {
    addClass(classNames: string): JQuery;
    hasClass(className: string): bool;
    removeClass(className?: any): JQuery;

    attr(attributeName: string, value: any): JQuery;
    removeAttr(attributeName: any): JQuery;

    find(selector: string): JQuery;

    parent(): JQuery;

    next(): JQuery;
    prev(): JQuery;

    siblings(): JQuery;

    children(selector?: any): JQuery;

    each(func: (index: any, elem: Element) => JQuery);

    map(callback: (index: any, domElement: Element) =>any): JQuery;

    filter(selector: string): JQuery;
    filter(func: (index: any) =>any): JQuery;

    first(): JQuery;
    last(): JQuery;
    eq(index: number): JQuery;

    append(...content: any[]): JQuery;
    prepend(...content: any[]): JQuery;
    after(...content: any[]): JQuery;
    before(...content: any[]): JQuery;
    remove(selector: string): JQuery;
    replaceWith(content: string): JQuery;
    empty(): JQuery;

    html(htmlString: string): JQuery;
    html(): string;

    text(textString: string): JQuery;
    text(): string;

    toArray(): any[];

    clone() : JQuery;
    root() : JQuery;
    dom(): any;

    contains(container: Element, contained: Element): bool;
    isArray(obj: any): bool;
    inArray(value: any, array: any[], fromIndex?: number): number;
    merge(first: any[], second: any[]): any[];
}

declare interface CheerioOptionsInterface {
    ignoreWhitespace?: bool;
    xmlMode?: bool;
    lowerCaseTags?: bool;
}

declare module "cheerio" {
    export function load (html : string, options?: CheerioOptionsInterface) : JQuery;
}