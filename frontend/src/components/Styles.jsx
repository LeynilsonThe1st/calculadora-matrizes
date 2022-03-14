import { styled } from "@stitches/react";

export const FlexContainer = styled("div", {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  variants: {
    horizontal: {
      center: {
        justifyContent: "center",
      },
    },
    vertical: {
      center: {
        alignItems: "center",
      },
    },
    direction: {
      column: {
        flexDirection: "column",
        gap: 0,
      },
    },
  },
});

export const Label = styled("label", {
  fontWeight: "bold",
  borderLeft: "2px solid #ccc",
  display: "flex",
  padding: "5px 10px",
  backgroundColor: "white",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  transition: "all .3s ease-out",
});

export const Input = styled("input", {
  display: "flex",
  border: "none",
  borderLeft: "2px solid #ccc",
  borderBottom: "2px solid #ccc",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  padding: "10px",
  transition: "all .3s ease-out",
});

export const Select = styled("select", {
  display: "block",
  backgroundColor: "white",
  padding: "10px",
  border: "none",
  borderLeft: "2px solid #ccc",
  borderBottom: "2px solid #ccc",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  transition: "all .2s ease-out",
});

export const InputGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  [`&:hover ${Label}, &:focus-within ${Label}`]: {
    color: "hsl(210, 100%, 46%)",
    borderLeft: "2px solid hsl(210, 100%, 46%)",
  },
  [`&:hover ${Input}, &:hover ${Select}, &:focus-within ${Input}, &:focus-within ${Select}`]:
    {
      color: "hsl(210, 100%, 46%)",
      borderLeft: "2px solid hsl(210, 100%, 46%)",
      borderBottom: "2px solid hsl(210, 100%, 46%)",
      outline: 0,
    },
});

export const Grid = styled("div", {
  padding: "10px",
  display: "grid",
  gap: "10px",
  justifyContent: "center",
});

export const CalcularButton = styled("button", {
  padding: "15px 30px",
  color: "white",
  backgroundColor: "hsl(210, 100%, 56%)",
  border: "none",
  borderLeft: "2px solid hsl(210, 100%, 46%)",
  borderBottom: "2px solid hsl(210, 100%, 46%)",
  borderRadius: "5px",
  display: "block",
  fontWeight: "bold",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "30px",
  marginBottom: "30px",
  transition: "all .2s ease-out",
  "&:hover, &:focus": {
    cursor: "pointer",
    backgroundColor: "hsl(210, 100%, 46%)",
    borderLeft: "2px solid hsl(210, 100%, 26%)",
    borderBottom: "2px solid hsl(210, 100%, 26%)",
  },
  "&:disabled": {
    cursor: "not-allowed",
    backgroundColor: "hsla(210, 100%, 46%, .5)",
    borderLeft: "2px solid hsla(210, 100%, 26%, .5)",
    borderBottom: "2px solid hsla(210, 100%, 26%, .5)",

  },
  "&:active": {
    border: "none",
    marginBottom: "22px",
  },
});
