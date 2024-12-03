import { Product } from "@/types/type";


const URLProduct = `${process.env.NEXT_PUBLIC_API_URL}/product`

export const getProducts =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct}/${name}?language=${language}`)

    return res.json();
}


const URLProduct1 = `${process.env.NEXT_PUBLIC_API_URL}/product1`

export const getProducts1 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct1}/${name}?language=${language}`)

    return res.json();
}


const URLProduct2 = `${process.env.NEXT_PUBLIC_API_URL}/product2`

export const getProducts2 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct2}/${name}?language=${language}`)

    return res.json();
}


const URLProduct3 = `${process.env.NEXT_PUBLIC_API_URL}/product3`

export const getProducts3 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct3}/${name}?language=${language}`)

    return res.json();
}


const URLProduct4 = `${process.env.NEXT_PUBLIC_API_URL}/product4`

export const getProducts4 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct4}/${name}?language=${language}`)

    return res.json();
}

const URLProduct5 = `${process.env.NEXT_PUBLIC_API_URL}/product5`

export const getProducts5 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct5}/${name}?language=${language}`)

    return res.json();
}


const URLProduct6 = `${process.env.NEXT_PUBLIC_API_URL}/product6`

export const getProducts6 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct6}/${name}?language=${language}`)

    return res.json();
}

const URLProduct7 = `${process.env.NEXT_PUBLIC_API_URL}/product7`

export const getProducts7 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct7}/${name}?language=${language}`)

    return res.json();
}


const URLProduct8 = `${process.env.NEXT_PUBLIC_API_URL}/product8`

export const getProducts8 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct8}/${name}?language=${language}`)

    return res.json();
}


const URLProduct9 = `${process.env.NEXT_PUBLIC_API_URL}/product9`

export const getProducts9 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct9}/${name}?language=${language}`)

    return res.json();
}


const URLProduct10 = `${process.env.NEXT_PUBLIC_API_URL}/product10`

export const getProducts10 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct10}/${name}?language=${language}`)

    return res.json();
}



const URLProduct11 = `${process.env.NEXT_PUBLIC_API_URL}/product11`

export const getProducts11 =async(name:string,language:string):Promise<Product> =>{
    const res = await fetch(`${URLProduct11}/${name}?language=${language}`)

    return res.json();
}



const URLPRODUCTNOTQUERY = `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`

export const getAllProductNotQuery = async (language: string):Promise<Product[]> =>{
    const res = await fetch(`${URLPRODUCTNOTQUERY}?language=${language}`)

    return res.json()
} 