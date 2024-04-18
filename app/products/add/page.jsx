"use client"

import { useState } from "react"
import { addProduct } from "./actions"

export default function AddProduct() {

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')

    // estado donde conservar los mensajes de error
    const [error, setError] = useState({});

    function onSave(form){
        //evitar el submit
        form.preventDefault();

        //Validar los campos obligatorios
        //name, description y price

        let errorList = {};

        if(!name){
            errorList.name = "El nombre es obligatorio.";
        }

        if(!price){
            errorList.price = "El precio es obligatorio.";
        }else{
            if(!price.match("^[0-9]+$")){
                errorList.price = "El precio debe de ser un numero."
            }
        }

        if(!description){
            errorList.description = "La descripción es obligatorio.";
        }

        if(!category){
            errorList.category = "La categoria es obligatoria.";
        }


        //pasar lista de errores al estado
        setError({...errorList});

        //Si hay mensajes de error interrumpir el flujo
        if(Object.keys(errorList).length > 0){
            return;
        }

        //alert("se guardaron los datos");
        //mandar a guardar el producto

        addProduct({
            name,
            description,
            price,
            category,
        })
        .then((result) => {
            //cuando la funcion se ejecute correctamente
            //y retorne una respuesta
            console.log(result)

            //hacer algo con el resultado
            if (!result.success){
                alert(result.message)
                setError({...result.errors})
             }else{
                alert(result.message);
                setName('');
                setPrice('');
                setDescription('');
                setCategory('');

                //guardar producto
             }
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    return(
        <div className="m-8" onSubmit={onSave}>
            <h1>Agregar producto</h1>
            <form method="POST" className="flex flex-col space-y-4 text-black p-8 bg-slate-800 rounded-md">
                <input type="text" name="name" placeholder="Nombre del producto..." value={name} className="rounded-md"
                onChange={(e) => {
                    setName(e.target.value);
                    setError({
                        ...error,
                        name: undefined,
                    })
                }}/>
                <p className="text-white">{error.name || ''}</p>

                <input type="text" name="price" placeholder="Precio del producto..." value={price} className="rounded-md"
                onChange={(e) => {
                    setPrice(e.target.value);
                    setError({
                        ...error,
                        price: undefined,
                    })
                }}/>
                <p className="text-white">{error.price || ''}</p>

                <input type="text" name="description" placeholder="Descripción del producto" value={description} className="rounded-md"
                onChange={(e) => {
                    setDescription(e.target.value);
                    setError({
                        ...error,
                        description: undefined,
                    })
                }}/>
                <p className="text-white">{error.description || ''}</p>

                <select name="" id="" className="rounded-md" value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setError({
                        ...error,
                        category: undefined
                    })
                }}>
                    <option value="">Categoria</option>
                    <option value="Technology">Tecnologia</option>
                    <option value="Maintenance">Mantenimiento</option>
                </select>
                <p className="text-white">{error.category || ''}</p>

                <button type="submit" className="rounded-full bg-blue-300">Registrar producto</button>

            </form>
        </div>
    )
}