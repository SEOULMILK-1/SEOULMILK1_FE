import SideModal from './SideModal';

interface HQSideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function HQSideModal({ isOpen, onClose }: HQSideModalProps) {
  return <SideModal isOpen={isOpen} onClose={onClose} role="hq" />;
}

export default HQSideModal;
