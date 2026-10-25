function Toast({ toast, onClose }) {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div className="toast-box">
      <div className={`app-toast ${ok ? "toast-ok" : "toast-err"} shadow-lg slide-in`}>
        <i className={`ti ${ok ? "ti-circle-check-filled text-success" : "ti-alert-circle-filled text-orange"} fs-4`}></i>
        <div className="flex-grow-1 small fw-medium">{toast.text}</div>
        <button type="button" className="btn-close btn-close-white btn-sm" onClick={onClose} aria-label="Close"></button>
      </div>
    </div>
  );
}

export default Toast;
