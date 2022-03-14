import { useEffect, useState } from "react";
import API from "../api";
import {
  CalcularButton,
  FlexContainer,
  Input,
  InputGroup,
  Label,
} from "./Styles";
import PrimeiraMatriz from "./PrimeiraMatriz";
import SegundaMatriz from "./SegundaMatriz";
import "./App.css";
import { construirMatriz, construirMatrizResultado } from "./helpers";
import GridContainer from "./GridContainer";
import { styled } from "@stitches/react";
import ContentLoader from "react-content-loader";

const ThreeDots = (props) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
);

function Numero({ numero, setterNumero }) {
  return (
    <FlexContainer direction="column" vertical="center">
      <h3>Insira o número para realizar a operação</h3>
      <InputGroup css={{ maxWidth: "150px" }}>
        <Label htmlFor="numero">Número</Label>
        <Input
          type="number"
          step="any"
          name="numero"
          id="numero"
          value={numero}
          onChange={(e) => setterNumero(e.target.value || 0)}
        />
      </InputGroup>
    </FlexContainer>
  );
}

const DarkBG = styled("div", {
  backgroundColor: "#eee",
  padding: "20px",
  borderRadius: "5px",
});

function App() {
  const [matriz, setMatriz] = useState({
    linhas: 1,
    colunas: 1,
    valores: construirMatriz(1, 1),
  });
  const [matriz2, setMatriz2] = useState({
    linhas: 1,
    colunas: 1,
    valores: construirMatriz(1, 1, "B"),
  });
  const [operacao, setOperacao] = useState("");
  const [numero, setNumero] = useState(0);

  const [resposta, setResposta] = useState({
    matriz: null,
    valor: null,
    erro: null,
    loading: false,
  });

  const getValores = (mat) => {
    const res = [];
    for (let i = 0; i < mat.linhas; i++) {
      res.push([]);
      for (let j = 0; j < mat.colunas; j++) {
        let id = mat.valores[i][j].props.children[1].props.id;
        const el = document.getElementById(id);
        el.value = el.value || 0;
        res[i].push(parseFloat(el.value));
      }
    }
    return res;
  };

  const calcular = (e) => {
    e.preventDefault();
    setResposta({ matriz: null, valor: null, loading: true });

    const m1 = JSON.stringify(getValores(matriz));

    if (operacao.endsWith("mat")) {
      const m2 = JSON.stringify(getValores(matriz2));

      API.get(`/${operacao}?m1=${m1}&m2=${m2}`)
        .then((res) => {
          setResposta({
            matriz: res.data.matriz
              ? construirMatrizResultado(res.data.matriz[0])
              : null,
            valor: res.data.valor,
            loading: false,
          });
        })
        .catch((error) => {
          resposta.loading = false;
          resposta.erro = error.response.data.detail;
          setResposta(resposta);
        });
    } else if (operacao.endsWith("num")) {
      const num = parseFloat(document.querySelector("#numero").value);

      API.get(`/${operacao}?m1=${m1}&num=${num}`)
        .then((res) => {
          setResposta({
            matriz: res.data.matriz
              ? construirMatrizResultado(res.data.matriz[0])
              : null,
            valor: res.data.valor,
            loading: false,
          });
        })
        .catch((error) => {
          resposta.loading = false;
          resposta.erro = error.response.data.detail;
          setResposta(resposta);
        });
    } else {
      API.get(`/${operacao}?m1=${m1}`)
        .then((res) => {
          setResposta({
            matriz: res.data.matriz
              ? construirMatrizResultado(res.data.matriz[0])
              : null,
            valor: res.data.valor,
            loading: false,
          });
        })
        .catch((error) => {
          resposta.loading = false;
          resposta.erro = error.response.data.detail;
          setResposta(resposta);
        });
    }
  };

  useEffect(() => {
    if (operacao === "soma-mat") {
      setMatriz2({
        linhas: matriz.linhas,
        colunas: matriz.colunas,
        valores: construirMatriz(matriz.linhas, matriz.colunas, "B"),
      });
    } else if (operacao === "mult-mat") {
      setMatriz2({
        linhas: matriz.colunas,
        colunas: matriz.colunas,
        valores: construirMatriz(matriz.colunas, matriz.colunas, "B"),
      });
    }
  }, [matriz.linhas, matriz.colunas, operacao]);

  useEffect(() => {
    window.scrollTo(0, document.querySelector("#root").scrollHeight);
  }, [resposta]);

  return (
    <div>
      <header>
        <h1>Calculadora de Matrizes</h1>
      </header>
      <div>
        <form onSubmit={calcular}>
          <FlexContainer horizontal="center">
            <PrimeiraMatriz
              matriz={matriz}
              setterMatriz={setMatriz}
              operacao={operacao}
              setterOperacao={setOperacao}
            />
            {operacao.endsWith("num") ? (
              <Numero numero={numero} setterNumero={setNumero} />
            ) : (
              operacao.endsWith("mat") && (
                <SegundaMatriz
                  matriz={matriz2}
                  setter={setMatriz2}
                  operacao={operacao}
                />
              )
            )}
          </FlexContainer>

          {operacao === "" ? (
            <CalcularButton disabled type="submit">
              seleccione uma operação
            </CalcularButton>
          ) : (
            <CalcularButton disabled={resposta.loading} type="submit">
              {resposta.loading ? "Aguarde um momento" : "Calcular"}
            </CalcularButton>
          )}

          {resposta.loading ? (
            <FlexContainer horizontal="center">
              <ThreeDots id="dots" />
            </FlexContainer>
          ) : (
            <Resultado
              id="resultado"
              matriz={resposta.matriz}
              valor={resposta.valor}
              erro={resposta.erro}
            />
          )}
        </form>
      </div>
    </div>
  );
}

const Resultado = ({ matriz, valor, erro }) => {
  if (erro != null) {
    return (
      <DarkBG>
        <h3>{erro}</h3>
      </DarkBG>
    );
  }
  if (valor != null) {
    return (
      <DarkBG>
        <h3>Determinante: {valor}</h3>
      </DarkBG>
    );
  }
  if (matriz != null) {
    return (
      <DarkBG>
        <h3>Matriz Resultante</h3>
        <GridContainer linhas={matriz.length} colunas={matriz[0].length}>
          {matriz}
        </GridContainer>
      </DarkBG>
    );
  }
  return "";
};

export default App;
