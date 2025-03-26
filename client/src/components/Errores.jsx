export default function Errores({ data }) {
    return (
      <div className="seccion">
        <h3>Errores</h3>
        <ul>
          {data.map((e, i) => (
            <li key={i}>
              <strong>{e.tipo}:</strong> {e.descripcion}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  