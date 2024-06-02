export interface Image {
  id: number;
  slug: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface SearchResult {
  results: Image[];
  total: number;
  total_pages: number;
}
