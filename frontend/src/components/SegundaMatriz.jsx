import GridContainer from "./GridContainer";
import { construirMatriz } from "./helpers";
import { FlexContainer, Input, InputGroup, Label } from "./Styles";

function SegundaMatriz({ matriz, setter, operacao }) {
  const alterarMatriz = (e) => {
    let input = e.target;
    if (input.name == "linha") {
      setter({
        linhas: parseInt(input.value),
        colunas: matriz.colunas,
        valores: construirMatriz(parseInt(input.value), matriz.colunas, "B"),
      });
    } else if (input.name == "coluna") {
      setter({
        linhas: matriz.linhas,
        colunas: parseInt(input.value),
        valores: construirMatriz(matriz.linhas, parseInt(input.value), "B"),
      });
    }
  };

  return (
    <div>
      <h3>Insira o tamanho e os valores da segunda Matriz</h3>

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
            disabled={operacao == "soma-mat" || operacao == "mult-mat"}
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
            disabled={operacao == "soma-mat"}
          />
        </InputGroup>
      </FlexContainer>

      <h3>Insira os valores da matriz</h3>

      <GridContainer linhas={matriz.linhas} colunas={matriz.colunas}>
        {matriz.valores}
      </GridContainer>
    </div>
  );
}

export default SegundaMatriz;
