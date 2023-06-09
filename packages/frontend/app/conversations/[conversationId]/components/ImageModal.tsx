import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-auto">
        <Image fill src={src} className="object-fill" alt="Image" />
      </div>
    </Modal>
  );
};

export default ImageModal;
