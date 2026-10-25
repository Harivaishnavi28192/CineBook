function PageHeader({ title, subtitle, children }) {
  return (
    <section className="page-header">
      <div className="container pt-2 pb-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div className="reveal">
            <h1 className="display-3 mb-1 page-header-title">{title}</h1>
            {subtitle && <p className="page-header-sub text-secondary mb-0">{subtitle}</p>}
          </div>
          {children && <div className="reveal">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
