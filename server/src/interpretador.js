// Tabla de símbolos
const tablaSimbolos = new Map();

// Lista de errores
const errores = [];

// Consola de salida
let consola = "";

function interpretar(instrucciones) {
    tablaSimbolos.clear();
    errores.length = 0;
    consola = "";
  
    try {
      for (const instr of instrucciones) {
        ejecutar(instr);
      }
    } catch (err) {
      errores.push({ tipo: "Interno", descripcion: err.message });
    }
  
    return {
      consola,
      errores,
      simbolos: [...tablaSimbolos.entries()].map(([id, val]) => ({
        id,
        tipo: val.tipo,
        valor: val.valor
      }))
    };
  }

  function ejecutar(instr) {
    switch (instr.tipo) {
      case "DECLARACION":
        if (tablaSimbolos.has(instr.id)) {
          errores.push({
            tipo: "Semántico",
            descripcion: `Variable ${instr.id} ya declarada`
          });
          return;
        }
        const valDecl = evaluar(instr.valor);
        tablaSimbolos.set(instr.id, { tipo: instr.tipoDato, valor: valDecl });
        break;
  
      case "ASIGNACION":
        if (!tablaSimbolos.has(instr.id)) {
          errores.push({
            tipo: "Semántico",
            descripcion: `Variable ${instr.id} no declarada`
          });
          return;
        }
        const valAsignado = evaluar(instr.valor);
        tablaSimbolos.get(instr.id).valor = valAsignado;
        break;
  
      case "IMPRIMIR":
        const valImp = evaluar(instr.valor);
        consola += valImp + "\n";
        break;
  
      default:
        errores.push({
          tipo: "Sintáctico",
          descripcion: `Instrucción desconocida: ${JSON.stringify(instr)}`
        });
    }
  }
  function evaluar(expr) {
    switch (expr.tipo) {
      case "NUMERO":
        return expr.valor;
  
      case "CADENA":
        return expr.valor;
  
      case "ID":
        if (!tablaSimbolos.has(expr.nombre)) {
          errores.push({
            tipo: "Semántico",
            descripcion: `Variable ${expr.nombre} no declarada`
          });
          return null;
        }
        return tablaSimbolos.get(expr.nombre).valor;
  
      case "SUMA":
        return evaluar(expr.izquierda) + evaluar(expr.derecha);
      case "RESTA":
        return evaluar(expr.izquierda) - evaluar(expr.derecha);
      case "MULT":
        return evaluar(expr.izquierda) * evaluar(expr.derecha);
      case "DIV":
        return evaluar(expr.izquierda) / evaluar(expr.derecha);
  
      default:
        errores.push({
          tipo: "Interno",
          descripcion: `Expresión desconocida: ${JSON.stringify(expr)}`
        });
        return null;
    }
  }
module.exports = interpretar;