import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from 'uuid';
import Notas from "./Notas";

function BasePrincipal() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [importante, setImportante] = useState(false);
    const [notas, setNotas] = useState([]);
    const notasRef = useRef();
    const nota_txtRef = useRef();
    const checkboxRef = useRef();
    const key = "notas-app-notas";

    useEffect(() => {
        const misNotas = JSON.parse(localStorage.getItem(key));
        if (misNotas) {
            setNotas(misNotas);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(notas);
        localStorage.setItem(key, json);
        console.log(notas);
    }, [notas, nota_txtRef]);

    const agregarNota = () => {
        const nota = titulo;
        const desc = descripcion;
        const txt_nota = descripcion;
        const checkbox = document.getElementById("flexCheckDefault");
        const checked = checkbox.checked;
        const error = document.getElementById("error_descripcion");
        const input2 = document.getElementById("input2");

        if (desc === '') {
            input2.classList.add("error_border");
            error.className = "error";
            error.textContent = "El campo descripcion no puede estar vacio";
            return;
        } else {
            input2.classList.remove("error_border");
            error.textContent = "";
        }

        setNotas((prev) => {
            const nuevaNota = {
                id: uuid(),
                nota: nota,
                descripcion: txt_nota,
                importante: checked
            };
            return [...prev, nuevaNota];
        });

        setTitulo("");
        setDescripcion("");
        checkboxRef.current.checked = false;
    };

    const eliminarNota = (id) => {
        setNotas((prev) => prev.filter((nota) => nota.id !== id));
    };

    return (
        <div>
            <div className="container-entrys mt-2">
                <div>
                    <input ref={notasRef} onChange={(e) => setTitulo(e.target.value)} value={titulo} className="form-control input-title" type="text" placeholder="Título" id="input1"></input>
                </div>
                <div>
                    <div>                       
                    </div>
                    <input ref={nota_txtRef} onChange={(e) => setDescripcion(e.target.value)} value={descripcion} className="form-control input-description" type="text" placeholder="Descripción" id="input2"></input>
                    <div>
                        <div id="error_descripcion"></div>
                    </div>
                </div>
                <div className="form-check">
                    <input ref={checkboxRef} className="form-check-input" type="checkbox" value={importante} id="flexCheckDefault"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Importante!
                    </label>
                </div>
                <div className="btn-div">
                    <button onClick={() => agregarNota()} type="button" className="btn btn-dark">AGREGAR</button>
                </div>
            </div>
            <div className="div-notes">
                {notas.map((nota, index) => (
                    <Notas
                        key={nota.id}
                        id={nota.id}
                        title={nota.nota}
                        txt={nota.descripcion}
                        index={index}
                        checked={nota.importante}
                        onDelete={eliminarNota}
                    />
                ))}
            </div>
        </div>
    );
}

export default BasePrincipal;

