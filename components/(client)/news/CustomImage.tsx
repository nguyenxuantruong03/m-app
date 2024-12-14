"use client"
import Image from "next/image"
import { useState } from "react"

type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const prty = priority ? true : false

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <div className="w-full h-full">
            <Image
                className="rounded-lg mx-auto cursor-pointer"
                src={src}
                alt={alt}
                width={650}
                height={650}
                priority={prty}
                onClick={openModal}
            />

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999999999]"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white p-4 rounded-lg"
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
                    >
                        <Image
                            className="rounded-lg"
                            src={src}
                            alt={alt}
                            width={1200}
                            height={1200}
                        />
                        <button
                            onClick={closeModal}
                            className="absolute cursor-pointer top-2 right-2 flex items-center justify-center text-xl rounded-full text-slate-900 w-6 h-6 bg-gray-300 hover:bg-gray-400"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
