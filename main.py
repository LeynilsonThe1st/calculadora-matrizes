# from time import sleep
from typing import Union
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from fastapi.middleware.cors import CORSMiddleware
import json

from matriz import Matriz, Tipo_Matriz, adjunta, det, inversa, mult_escalar, mult_matriz, soma_matriz, transpor

app = FastAPI()

app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


templates = Jinja2Templates(directory="frontend/dist")


@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def index(request: Request):

    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/det")
async def determinante(m1: str):
    try:
        valor = det(json.loads(m1))
    except ValueError as err:
        raise HTTPException(status_code=404, detail=err.args[0])

    return {"matriz": None, "valor": valor}


@ app.get("/soma-mat")
async def soma_mat(m1: str, m2: str):
    try:
        soma: Tipo_Matriz = soma_matriz(json.loads(m1), json.loads(m2))
    except ValueError as err:
        raise HTTPException(status_code=404, detail=err.args[0])

    return {"matriz": [soma], "valor": None}


@ app.get("/mult-mat")
async def mult_mat(m1: str, m2: str):
    try:
        mult: Tipo_Matriz = mult_matriz(json.loads(m1), json.loads(m2))
    except ValueError as err:
        raise HTTPException(status_code=404, detail=err.args[0])

    return {"matriz": [mult], "valor": None}


@ app.get("/mult-num")
async def mult_num(m1: str, num: Union[int, float]):
    try:
        print("num: ", num)
        mult: Tipo_Matriz = mult_escalar(json.loads(m1), num)
        print(mult)
    except ValueError as err:
        raise HTTPException(status_code=404, detail=err.args[0])

    return {"matriz": [mult], "valor": None}


@ app.get("/trans")
async def transposta(m1: str):
    mat: Tipo_Matriz = transpor(json.loads(m1))
    return {"matriz": [mat], "valor": None}


@ app.get("/inv")
async def inv(m1: str):
    try:
        inv = inversa(json.loads(m1))
    except ValueError as err:
        raise HTTPException(status_code=404, detail=err.args[0])

    return {"matriz": [inv], "valor": None}


@ app.get("/adj")
async def adj(m1: str):
    m1 = Matriz(json.loads(m1))
    try:
        adj = adjunta(m1)
    except ValueError as err:
        raise HTTPException(status_code=404, detail=err.args[0])

    return {"matriz": [adj], "valor": None}
