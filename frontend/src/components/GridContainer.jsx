import { Grid } from "./Styles";

function GridContainer(props) {
    return (
      <Grid
        css={{
          gridTemplateRows: `repeat(${props.linhas}, 1fr)`,
          gridTemplateColumns: `repeat(${props.colunas}, 80px)`,
        }}
      >
        {props.children}
      </Grid>
    );
  }
export default GridContainer;
  