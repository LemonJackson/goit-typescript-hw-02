import React, { useState } from "react";
import Modal from "react-modal";

import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  modalImage: string;
  onClose: () => void;
}

export default function ImageModal({
  modalImage,
  isOpen,
  onClose,
}: ImageModalProps) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 2,
    },
    content: {
      backgroundColor: "transparent",
      border: "none",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      className={css.overlay}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <img
        src={modalImage}
        alt="largeImage"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </Modal>
  );
}
