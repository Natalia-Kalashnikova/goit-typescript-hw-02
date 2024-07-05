import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import fetchImages from '../../apiService/image-api';
import { SelectedImage, ImageResponse } from './App.types';
import { Photo } from '../../apiService/image-api.types';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const App: React.FC = () => {
  const [images, setImages] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getImages = async () => {
      setLoader(true);
      try {
        setError(false);
        const data: ImageResponse = await fetchImages(page, query);
        if (data.results.length === 0) {
          toast.error("Sorry. There are no images ... 😭");
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
          setShowBtn(data.total_pages > 0 && data.total_pages !== page);

        }
      } catch (error) {
        setError(true);
        toast.error("Oops! Something went wrong. Please try again later...");
      } finally {
        setLoader(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSubmit = (query: string) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image: Photo) => {
    setSelectedImage({
      imageUrl: image.urls.regular,
      altDescription: image.alt_description,
      authorName: image.user.name,
      likes: image.likes,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {error && <ErrorMessage message="Oops! Something went wrong." />}
      {loader && <Loader />}
      {images.length > 0 && !loader && showBtn && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          regular={selectedImage.imageUrl}
          altDescription={selectedImage.altDescription}
          likes={selectedImage.likes}
          user={selectedImage.authorName}
        />
      )}
    </div>
  );
}

export default App;
