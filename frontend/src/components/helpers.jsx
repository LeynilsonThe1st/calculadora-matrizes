import { Input, InputGroup, Label } from "./Styles";

export const construirMatriz = (lin, col, name = "A") => {
  const mat = [];
  for (let i = 0; i < lin; i++) {
    mat.push([]);
    for (let j = 0; j < col; j++) {
      mat[i].push(
        <InputGroup key={`key-${i}${j}`}>
          <Label htmlFor={`${name + (i + 1)}${j + 1}`}>{`${name + (i + 1)}${
            j + 1
          }`}</Label>
          <Input
            type="number"
            step="any"
            name={`${name + (i + 1)}${j + 1}`}
            id={`${name + (i + 1)}${j + 1}`}
            defaultValue="0"
          />
        </InputGroup>
      );
    }
  }
  return mat;
};

export const construirMatrizResultado = (matriz) => {
  const mat = [];
  for (let i = 0; i < matriz.length; i++) {
    mat.push([]);
    for (let j = 0; j < matriz[0].length; j++) {
      mat[i].push(
        <InputGroup key={`key-${i}${j}`}>
          <Label htmlFor={`C${i + 1}${j + 1}`}>{`C${i + 1}${j + 1}`}</Label>
          <Input
            type="text"
            name={`C${i + 1}${j + 1}`}
            id={`C${i + 1}${j + 1}`}
            defaultValue={matriz[i][j].toFixed(isInt(matriz[i][j]) ? 0 : 3)}
            readOnly={true}
          />
        </InputGroup>
      );
    }
  }
  return mat;
};

const isInt = (number) => {
  return number - parseInt(number) === 0
}

