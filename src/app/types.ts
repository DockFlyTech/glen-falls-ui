export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    file: string;
  };
}

export interface WPBaseContent {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      avatar_urls?: Record<string, string>;
    }>;
    "wp:featuredmedia"?: Array<WPMedia>;
  };
}

export interface Post extends WPBaseContent {
  excerpt: {
    rendered: string;
  };
  _embedded?: WPBaseContent["_embedded"] & {
    "wp:term"?: Array<Array<WPTerm>>;
  };
}

export interface Page extends WPBaseContent {
  excerpt?: {
    rendered: string;
  };
}

export interface FrontPagePreviewMedia {
  image: WPMedia | null;
  pdf: WPMedia | null;
}