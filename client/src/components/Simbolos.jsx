export default function Simbolos({ data }) {
    return (
      <div className="seccion">
        <h3>Tabla de Símbolos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => (
              <tr key={i}>
                <td>{s.id}</td>
                <td>{s.tipo}</td>
                <td>{JSON.stringify(s.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  