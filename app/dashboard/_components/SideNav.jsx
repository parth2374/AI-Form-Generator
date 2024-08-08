import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CreateForm from './CreateForm'

const SideNav = () => {

    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard'
        },
        {
            id: 1,
            name: 'Responses',
            icon: MessageSquare,
            path: '/dashboard/responses'
        },
        {
            id: 1,
            name: 'Analytics',
            icon: LineChart,
            path: '/dashboard/analytics'
        },
        {
            id: 1,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
    ]

    const { user } = useUser();
    const path = usePathname();
    const [formList, setFormList] = useState();
    const [percFileCreated, setPercFileCreated] = useState(0);

    useEffect(() => {
        user && GetFormList();
    }, [user])

    const GetFormList = async () => {
        const result = await db.select().from(JsonForms).where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(JsonForms.id));
        setFormList(result);

        const perc = (result?.length / 20) * 100;
        setPercFileCreated(perc);
    }

    const [slide, setSlide] = useState('full');

    return (
        <div className={`h-screen shadow-md border -translate-x-${slide} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className='p-5'>
                { menuList.map((menu, index) => (
                    <Link
                        href={menu?.path}
                        key={index}
                        className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${path == menu.path && 'bg-primary text-white'}`}
                    >
                        <menu.icon />
                        <p>{ menu.name }</p>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-20 p-6 w-64'>
                {/* <Button className='w-1 sm:w-full md:w-full'>+ Create Form</Button> */}
                <div className='w-full bg-primary rounded-lg flex items-center justify-center'>
                    <CreateForm />
                </div>
                <div className='my-7'>
                    <Progress value={percFileCreated} className='w-1 sm:w-full md:w-full' />
                    <h2 className='text-sm mt-2 text-gray-600'><strong>{formList?.length}</strong> out of <strong>20</strong> files created</h2>
                    <h2 className='text-sm mt-3 text-gray-600'>Upgrade your form for unlimited access</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav





{/* <div class="sidebar bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out"> */}