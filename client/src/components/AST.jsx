import React, { useEffect, useState } from "react";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

export default function AST({ dot }) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!dot || typeof dot !== "string") {
      setSvg("<p>No se generó ningún AST.</p>");
      return;
    }

    const viz = new Viz({ Module, render });

    viz.renderString(dot)
      .then(setSvg)
      .catch((err) => {
        console.error("Error al generar AST:", err);
        setSvg("<p>Error al generar AST.</p>");
      });
  }, [dot]);

  return (
    <div className="seccion">
      <h3>Árbol de Sintaxis (AST)</h3>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
