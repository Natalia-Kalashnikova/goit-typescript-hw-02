export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  regular: string;
  altDescription: string;
  likes: number;
  user: string;
}
