//formulario para cambiar contraseña
//solo tiene acceso si se esta auntenticando

//componente cliente
// -- estado para: contraseña, confirmar contraseña
// * validar que la contrseña tenga longitud mínima: 6 carácteres
//* que la contraseña y confirmar contraseña sean iguales
// --mandar actualizar la contraseña desde una función por el lado del servidor
"use client"

import { useEffect, useState } from "react";
import {addPassword} from "./actions"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Page() {

    const [password,setPassword] = useState('')
    const [confpassword,setConfpassword] = useState('')
    const supabase = createClient()
    const router = useRouter()

    // estado donde conservar los mensajes de error
    const [error, setError] = useState({});

    /*useEffect(() => {
        const autenticar = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if (!session){
                router.push("/login")
            }
        }
        autenticar()
    }, [])*/

    function updatePa(form){
        //evitar el submit
        form.preventDefault();

        //Validar los campos obligatorios
        //name, description y price

        let errorList = {};

        if(!password){
            errorList.password = "La contraseña es obligatoria.";
        }

        if(!confpassword){
            errorList.confpassword = "Es obligatorio este campo.";
        }

        if(password !== confpassword){
            errorList.password= "Los datos no coinciden."
        }


        //pasar lista de errores al estado
        setError({...errorList});

        //Si hay mensajes de error interrumpir el flujo
        if(Object.keys(errorList).length > 0){
            return;
        }

        //alert("se guardaron los datos");
        //mandar a guardar el producto

        addPassword(
            password,
            confpassword
        )
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
                setPassword('');
                setConfpassword('');

                //guardar producto
             }
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    return (
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2" onSubmit={updatePa}>
            <form method="POST" className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <h1>Cambiar contraseña</h1>
                <input type="password" name="password" placeholder="Ingrese nueva contraseña" value={password} className="rounded-md px-4 py-2 bg-inherit border mb-6" maxLength={6}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError({
                            ...error,
                            password: undefined,
                        })
                    }} />
                <p className="text-white">{error.password || ''}</p>

                <input type="password" name="conpassword" placeholder="Confirmar contraseña" value={confpassword} className="rounded-md px-4 py-2 bg-inherit border mb-6" maxLength={6}
                    onChange={(e) => {
                        setConfpassword(e.target.value);
                        setError({
                            ...error,
                            confpassword: undefined,
                        })
                    }} />
                <p className="text-white">{error.confpassword || ''}</p>

                <button
                    type="submit"
                    className="bg-green-700 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Cambiar contraseña
                </button>

            </form>
        </div>
    )
}