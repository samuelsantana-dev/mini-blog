import "./Loading.css";

export function Loading() {
  return (
    <div className="loading-viewport">
      <div className="gold-spinner" role="status" aria-label="Carregando">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
}
