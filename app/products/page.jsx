"use client"

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Slider from '../../components/slider';

export default function Page() {
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    router.push('/login');
                } else {
                    const { data } = await supabase.from('products').select();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('products')
                .select()
                .like('name', `%${search}%`);
            setProducts(data);
        } catch (error) {
            console.error('Error searching products:', error.message);
        }
    };

    const handleCategorySearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await supabase
                .from('products')
                .select()
                .like('category', `%${selectedOption}%`);
            setProducts(data);
        } catch (error) {
            console.error('Error searching products by category:', error.message);
        }
    };

    const handleEdit = (id) => {
        router.push(`/products/visualise/${id}`);
    };

    const productCard = (product) => (
        <div key={product.id} className="flex h-[100px] w-[100px] border border-1 items-center justify-center">
            <img
                className="flex"
                style={{ height: '100px', width: '100px' }}
                src={product.preview}
                alt={product.name}
            />
        </div>
    );

    return (
        <div className="flex my-auto items-center justify-center flex-col space-y-4">
            <title>Productos</title>
            <form onSubmit={handleSearch} className="text-black">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="border rounded px-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="rounded bg-blue-300 px-2 ml-3">
                    Buscar
                </button>
            </form>

            <select
                value={selectedOption}
                className="border rounded px-2 ml-3 text-black"
                onChange={(e) => setSelectedOption(e.target.value)}
                onClick={handleCategorySearch}
            >
                <option value="">Categoría</option>
                <option value="Technology">Tecnología</option>
                <option value="Maintenance">Mantenimiento</option>
            </select>

            {!products || products.length === 0 ? (
                <p>Ningún producto para mostrar.</p>
            ) : (
                <table className="border-spacing-2 bg-white text-black shadow-md shadow-white rounded-md">
                    <thead>
                        <tr className="border border-slate-600">
                            <th className="border border-slate-700">Nombre</th>
                            <th className="border border-slate-700">Precio</th>
                            <th className="border border-slate-700">Descripción</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border border-slate-600">
                                <td className="border border-slate-700 p-4">{product.name}</td>
                                <td className="border border-slate-700 p-4">${product.price}</td>
                                <td className="border border-slate-700 p-4">{product.description}</td>
                                <td>
                                    <button className="rounded bg-blue-300 m-2" onClick={() => handleEdit(product.id)}>
                                        Visualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="py-14 px-4 block w-full">
                <h1>Productos</h1>
                <Slider height={120} itemWidth={100} items={products?.map((product) => productCard(product))} />
            </div>
        </div>
    );
}