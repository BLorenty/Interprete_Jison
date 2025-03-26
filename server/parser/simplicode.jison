%lex
%%
[ \t\r]+                      /* skip horizontal whitespace */
"ingresar"                    return 'INGRESAR';
"como"                        return 'COMO';
"con valor"                   return 'CONVALOR';
"entero"                      return 'TIPO_ENTERO';
"cadena"                      return 'TIPO_CADENA';
"->"                          return 'ASIGNAR';
"imprimir"                    return 'IMPRIMIR';
[0-9]+                        return 'NUMERO';
\"[^"]*\"                     return 'CADENA';
[a-zA-Z_][a-zA-Z0-9_]*        return 'ID';
"+"                           return '+';
"-"                           return '-';
"*"                           return '*';
"/"                           return '/';
";"                           return ';';
\n                            return 'NEWLINE';
<<EOF>>                       return 'EOF';
. {
    console.error(`Carácter no reconocido: '${yytext}'`);
    return 'INVALIDO';
}
/lex

/* Operator precedence - lowest to highest */
%left '+' '-'
%left '*' '/'

%start programa
%token INGRESAR COMO CONVALOR TIPO_ENTERO TIPO_CADENA ASIGNAR IMPRIMIR ID NUMERO CADENA NEWLINE

%%

programa
    : sentencias EOF
        { return $1; }
    ;

sentencias
    : sentencias sentencia
        { 
          if ($2 !== null) {
            $$ = $1.concat([$2]); 
          } else {
            $$ = $1;
          }
        }
    | /* empty */
        { $$ = []; }
    ;

sentencia
    : instruccion separador
        { $$ = $1; }
    | separador
        { $$ = null; }
    ;

separador
    : NEWLINE
    | ';'
    ;

instruccion
    : INGRESAR ID COMO TIPO_ENTERO CONVALOR expresion
        { $$ = { tipo: 'DECLARACION', id: $2, tipoDato: 'entero', valor: $6 }; }
    | INGRESAR ID COMO TIPO_CADENA CONVALOR CADENA
        { $$ = { tipo: 'DECLARACION', id: $2, tipoDato: 'cadena', valor: { tipo: 'CADENA', valor: $6.slice(1, -1) } }; }
    | ID ASIGNAR expresion
        { $$ = { tipo: 'ASIGNACION', id: $1, valor: $3 }; }
    | IMPRIMIR expresion
        { $$ = { tipo: 'IMPRIMIR', valor: $2 }; }
    ;

expresion
    : expresion '+' expresion
        { $$ = { tipo: 'SUMA', izquierda: $1, derecha: $3 }; }
    | expresion '-' expresion
        { $$ = { tipo: 'RESTA', izquierda: $1, derecha: $3 }; }
    | expresion '*' expresion
        { $$ = { tipo: 'MULTIPLICACION', izquierda: $1, derecha: $3 }; }
    | expresion '/' expresion
        { $$ = { tipo: 'DIVISION', izquierda: $1, derecha: $3 }; }
    | NUMERO
        { $$ = { tipo: 'NUMERO', valor: Number($1) }; }
    | ID
        { $$ = { tipo: 'ID', nombre: $1 }; }
    | CADENA
        { $$ = { tipo: 'CADENA', valor: $1.slice(1, -1) }; }
    ;