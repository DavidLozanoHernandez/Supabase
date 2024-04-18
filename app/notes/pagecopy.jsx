"use client"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { useState } from 'react'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const [search, setSearch] = useState('');

  //Query que lee todos los registros de la tabla notes y los renvia como json
  const { data: products, error} = await supabase.from('products').select()

  return (
    <div className='flex my-auto items-center justify-center'>
        
        <form action="">
                <input 
                    type="text"
                    placeholder='Buscar...' 
                    className='border rounded px-2'
                    defaultValue={search}
                    onChange={(e) => {
                        setSearch(e.target.value); 
                    }}
                />
                <button 
                    type='sumit'
                    className='rounded bg-blue-300 px-2 ml-3'
                >
                        Buscar
                </button>
            </form>

            {!products || products?.length == 0
                ? <p>Ningun producto para mostrar. {!!error ? error.message : ''}</p>
                :null
            }

        <table className='border-spacing-2 bg-white text-black shadow-md shadow-white rounded-md'>
            <thead>
            <tr className='border border-slate-600'>
                <th className='border border-slate-700'>Name</th>
                <th className='border border-slate-700'>Price</th>
                <th className='border border-slate-700'>Descripción</th>
            </tr>
            </thead>

            <tbody>
                {products.map((products) => 
                    <tr className='border border-slate-600' key={products.id}>
                        <td className='border border-slate-700 p-4'>{products.name}</td>
                        <td className='border border-slate-700 p-4'>{'$' + products.price}</td>
                        <td className='border border-slate-700 p-4'>{products.description}</td>
                    </tr>)} 
            </tbody>
        </table>
    </div>
  );
}



    /*<ul>
        {products.map((products) => <li className='border m-2 p-2' key={products.id}>{products.name + ' '}{'$' + products.price + ' '}{products.description}</li>)}
    </ul>*/