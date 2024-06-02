import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  items: Image[];
  openModal: (img: string) => void;
}

export default function ImageGallery({ items, openModal }: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li className={css.item} key={item.id + Date.now()}>
          <ImageCard item={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
