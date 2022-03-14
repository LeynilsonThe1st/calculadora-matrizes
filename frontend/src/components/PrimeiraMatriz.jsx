import { useEffect } from "react";
import GridContainer from "./GridContainer";
import { construirMatriz } from "./helpers";
import { FlexContainer, Input, InputGroup, Label, Select } from "./Styles";

function PrimeiraMatriz({ matriz, setterMatriz, operacao, setterOperacao }) {
  const alterarMatriz = (e) => {
    let input = e.target;
    if (input.name == "linha") {
      setterMatriz({
        linhas: parseInt(input.value),
        colunas: matriz.colunas,
        valores: construirMatriz(parseInt(input.value), matriz.colunas),
      });
    } else if (input.name == "coluna") {
      setterMatriz({
        linhas: matriz.linhas,
        colunas: parseInt(input.value),
        valores: construirMatriz(matriz.linhas, parseInt(input.value)),
      });
    }
  };

  const alterarOperacao = (e) => {
    setterOperacao(e.target.value);
  };

  useEffect(() => {
    switch (operacao) {
      case "adj":
      case "inv":
      case "det":
        if (matriz.linhas != matriz.colunas) {
          setterOperacao("");
        }
        break;
    }
  }, [matriz.linhas, matriz.colunas]);

  return (
    <div>
      <h3>Insira o tamanho da matriz e a operação</h3>

      <FlexContainer horizontal="center">
        <InputGroup>
          <Label htmlFor="linha">Linhas</Label>
          <Input
            type="number"
            name="linha"
            id="linha"
            min="1"
            max="10"
            value={matriz.linhas}
            onChange={alterarMatriz}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="coluna">Colunas</Label>
          <Input
            type="number"
            name="coluna"
            id="coluna"
            min="1"
            max="10"
            value={matriz.colunas}
            onChange={alterarMatriz}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="op">Operação</Label>
          <Select name="op" id="op" value={operacao} onChange={alterarOperacao}>
            <option value="">Seleccione uma operação</option>
            <option value="soma-mat">Soma</option>
            <option value="mult-mat">Multiplicação</option>
            <option value="mult-num">Multiplicação por um escalar</option>
            <option value="trans">Transposta</option>
            <option value="adj" disabled={matriz.linhas != matriz.colunas}>
              Adjunta
            </option>
            <option value="inv" disabled={matriz.linhas != matriz.colunas}>
              Inversa
            </option>
            <option value="det" disabled={matriz.linhas != matriz.colunas}>
              Determinante
            </option>
          </Select>
        </InputGroup>
      </FlexContainer>

      <h3>Insira os valores da matriz</h3>

      <GridContainer linhas={matriz.linhas} colunas={matriz.colunas}>
        {matriz.valores}
      </GridContainer>
    </div>
  );
}

export default PrimeiraMatriz;
