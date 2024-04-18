"use client"

export default function SwiperPage() {
    //función que retorna una tarjeta para el producto
    const content = (product, index) => (
        <div
            key={product.id}
            className="p-4 h-[120px] w-[150px] bg-blue-600 border border-1 absolute"
            style={{left: `${index * 170}px`}}
        >
            <p>{product.name}</p>
        </div>
    );

    const products = [
        {id:'1', name: 'Producto 1'},
        {id:'2', name: 'Producto 2'},
        {id:'3', name: 'Producto 3'},
        {id:'4', name: 'Producto 4'},
        {id:'5', name: 'Producto 5'},
        {id:'6', name: 'Producto 6'},
        {id:'7', name: 'Producto 7'},
        {id:'8', name: 'Producto 8'}
    ];

    return(
        <div
            className="py-14 px-4 block w-full"
        >
            <h1>Este es un ejemplo de slider</h1>
            <div className="overflow-x-auto relative h-[120px]">
                {products.map((product, index) =>{
                    return content(product, index)
                })}
            </div>
        </div>
    );
}