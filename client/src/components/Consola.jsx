export default function Consola({ texto }) {
    return (
      <div className="seccion">
        <h3>Consola</h3>
        <pre className="consola">{texto}</pre>
      </div>
    );
  }