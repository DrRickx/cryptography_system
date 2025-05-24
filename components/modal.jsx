export default function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ease-out"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-fit shadow-lg transform transition-all duration-300 scale-95 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}

        <div className="mb-4">{children}</div>

        {footer && <div className="flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>
  );
}
