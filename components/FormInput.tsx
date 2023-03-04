import React from 'react'

export default function FormInput({ type, id, name, placeholder, value, onChange }) {
    return (
        <>
            <input className="bg-gray-200 w-full  border-2  border-gray-200 rounded py-1 px-1 text-teal-600 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>

    )
}
