import { Photo } from '../../apiService/image-api.types';

export interface ImageGalleryProps {
  images: Photo[];
  onImageClick: (image: Photo) => void;
}
