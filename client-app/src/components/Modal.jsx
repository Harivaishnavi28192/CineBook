// Reusable popup window (Bootstrap modal controlled by React state)
function Modal({ show, title, onClose, children, footer, size = "" }) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" onClick={onClose}>
        <div className={`modal-dialog modal-dialog-centered ${size}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-content pop-in">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
            )}
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;
