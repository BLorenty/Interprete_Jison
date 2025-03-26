const express = require("express");
const cors = require("cors");
const parser = require("./parser/parser");
const interpretar = require("./src/interpretador");
const generarAST = require("./src/ast-generator");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.post("/interpretar", (req, res) => {
    const codigo = req.body.codigo;
  
    try {
      const ast = parser.parse(codigo);
      const resultado = interpretar(ast);
      const astDot = generarAST(ast);
    
      res.json({
        consola: resultado.consola,
        errores: resultado.errores,
        simbolos: resultado.simbolos,
        ast: astDot,
      });
    } catch (err) {
      res.status(200).json({
        consola: "",
        errores: [{
          tipo: "Léxico",
          descripcion: err.message,
        }],
        simbolos: [],
        ast: "",
      });
    }
  }
  );

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
  