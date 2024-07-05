import { Photo } from '../../apiService/image-api.types';

export interface ImageCardProps {
  image: Photo;
  onClick: (image: Photo) => void;
}
