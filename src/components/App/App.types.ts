import { Photo } from '../../apiService/image-api.types';
export interface SelectedImage {
  imageUrl: string;
  altDescription: string;
  authorName: string;
  likes: number;
}

export interface ImageResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}
