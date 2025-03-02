import SideModal from './SideModal';

interface CSSideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CSSideModal({ isOpen, onClose }: CSSideModalProps) {
  return <SideModal isOpen={isOpen} onClose={onClose} role="cs" />;
}

export default CSSideModal;
