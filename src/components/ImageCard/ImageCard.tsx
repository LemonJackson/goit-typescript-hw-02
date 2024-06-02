import css from "./ImageCard.module.css";

interface ImageCardProps {
  item: {
    urls: {
      small: string;
      regular: string;
    };
    slug: string;
  };
  openModal: (img: string) => void;
}

export default function ImageCard({
  item: { urls, slug },
  openModal,
}: ImageCardProps) {
  return (
    <img
      className={css.img}
      src={urls.small}
      alt={slug}
      onClick={() => {
        openModal(urls.regular);
      }}
    />
  );
}
