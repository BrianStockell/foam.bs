import { URI } from './uri';
import { Range } from './range';

export interface ResourceLink {
  type: 'wikilink' | 'link';
  rawText: string;
  range: Range;
  isEmbed: boolean;
}

export interface NoteLinkDefinition {
  label: string;
  url: string;
  title?: string;
  range?: Range;
}

export interface Tag {
  label: string;
  range: Range;
}

export interface Alias {
  title: string;
  range: Range;
}

export interface Section {
  label: string;
  range: Range;
}

export interface Resource {
  uri: URI;
  type: string;
  title: string;
  properties: any;
  sections: Section[];
  tags: Tag[];
  aliases: Alias[];
  links: ResourceLink[];

  // TODO to remove
  definitions: NoteLinkDefinition[];
}

export interface ResourceParser {
  parse: (uri: URI, text: string) => Resource;
}

export abstract class Resource {
  public static sortByTitle(a: Resource, b: Resource) {
    return a.title.localeCompare(b.title);
  }

  public static isResource(thing: any): thing is Resource {
    if (!thing) {
      return false;
    }
    return (
      (thing as Resource).uri instanceof URI &&
      typeof (thing as Resource).title === 'string' &&
      typeof (thing as Resource).type === 'string' &&
      typeof (thing as Resource).properties === 'object' &&
      typeof (thing as Resource).tags === 'object' &&
      typeof (thing as Resource).aliases === 'object' &&
      typeof (thing as Resource).links === 'object'
    );
  }

  public static findSection(resource: Resource, label: string): Section | null {
    if (label) {
      return resource.sections.find(s => s.label === label) ?? null;
    }
    return null;
  }
}
