export interface ImageResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}

export interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    [key: string]: string;
  };
  likes: number;
  user: {
    name: string;
    [key: string]: any;
  };
}
