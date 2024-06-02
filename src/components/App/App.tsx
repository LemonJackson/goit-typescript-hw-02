import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

import { fetchData } from "../../unsplash-api";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image, SearchResult } from "../../types";

import css from "./App.module.css";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [showBtn, setShowBtn] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setShowBtn(true);
    setError(false);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const openModal = (image: string): void => {
    setModalIsOpen(true);
    setModalImage(image);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages(): Promise<void> {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchData(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && (
        <ImageGallery items={images} openModal={openModal} />
      )}

      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && showBtn && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {modalIsOpen && (
        <ImageModal
          modalImage={modalImage}
          isOpen={modalIsOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
