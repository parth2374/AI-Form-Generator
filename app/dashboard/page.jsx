import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'
import { Menu } from 'lucide-react'

const page = () => {
    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl flex items-center gap-5 sm:justify-between'>
                Dashboard
                {/* <button onClick={}><Menu className='h-5 w-5 cursor-pointer' /></button> */}
                <CreateForm />
            </h2>
            {/* List of Forms */}
            <FormList />
        </div>
    )
}

export default page
