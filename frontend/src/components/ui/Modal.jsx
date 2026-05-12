import "./ui.css";

export function Modal({ open, title, children, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar", danger = false }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button className="modal-btn modal-cancel" onClick={onCancel}>{cancelText}</button>
          <button className={`modal-btn ${danger ? "modal-danger" : "modal-confirm"}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
