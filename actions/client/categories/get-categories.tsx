import { Category } from "@prisma/client";

const URLCategories = `${process.env.NEXT_PUBLIC_API_URL}/categories`

export const getCategories= async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories}?language=${language}`)

    return res.json()
} 

const URLCategories1 = `${process.env.NEXT_PUBLIC_API_URL}/categories1`

export const getCategories1 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories1}?language=${language}`)

    return res.json()
} 

const URLCategories2 = `${process.env.NEXT_PUBLIC_API_URL}/categories2`

export const getCategories2 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories2}?language=${language}`)

    return res.json()
} 

const URLCategories3 = `${process.env.NEXT_PUBLIC_API_URL}/categories3`

export const getCategories3 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories3}?language=${language}`)

    return res.json()
} 

const URLCategories4 = `${process.env.NEXT_PUBLIC_API_URL}/categories4`

export const getCategories4 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories4}?language=${language}`)

    return res.json()
} 

const URLCategories5 = `${process.env.NEXT_PUBLIC_API_URL}/categories5`

export const getCategories5 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories5}?language=${language}`)

    return res.json()
} 

const URLCategories6 = `${process.env.NEXT_PUBLIC_API_URL}/categories6`

export const getCategories6 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories6}?language=${language}`)

    return res.json()
} 

const URLCategories7 = `${process.env.NEXT_PUBLIC_API_URL}/categories7`

export const getCategories7 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories7}?language=${language}`)

    return res.json()
} 

const URLCategories8 = `${process.env.NEXT_PUBLIC_API_URL}/categories8`

export const getCategories8 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories8}?language=${language}`)

    return res.json()
} 

const URLCategories9 = `${process.env.NEXT_PUBLIC_API_URL}/categories9`

export const getCategories9 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories9}?language=${language}`)

    return res.json()
} 

const URLCategories10 = `${process.env.NEXT_PUBLIC_API_URL}/categories10`

export const getCategories10 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories10}?language=${language}`)

    return res.json()
} 

const URLCategories11 = `${process.env.NEXT_PUBLIC_API_URL}/categories11`

export const getCategories11 = async (language: string):Promise<Category[]> =>{
    const res = await fetch(`${URLCategories11}?language=${language}`)

    return res.json()
} 