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

export interface Post {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
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
    "wp:term"?: Array<Array<WPTerm>>;
  };
}
