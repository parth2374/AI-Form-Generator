import { Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"  
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const FieldEdit = ({ defaultValue, onUpdate, deleteField }) => {

    const [fieldLabel, setFieldLabel] = useState(defaultValue?.fieldLabel);
    const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

    return (
        <div className='flex gap-2'>
            <Popover>
                <PopoverTrigger><Edit className='h-5 w-5 text-gray-500' /></PopoverTrigger>
                <PopoverContent>
                    <h2>Edit Fields</h2>
                    <div className='mt-3'>
                        <label className='text-xs'>Label Name</label>
                        <Input
                            type="text"
                            className='mt-2'
                            defaultValue={defaultValue?.fieldLabel}
                            onChange={(e) => setFieldLabel(e.target.value)}
                        />
                    </div>
                    <div className='mt-2'>
                        <label className='text-xs'>Placeholder Name</label>
                        <Input
                            type="text"
                            className='mt-2'
                            defaultValue={defaultValue?.placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                        />
                    </div>
                    <Button
                        size='sm'
                        onClick={() => onUpdate({
                            fieldLabel: fieldLabel,
                            placeholder: placeholder
                        })}
                        className='mt-5'
                    >
                        Update
                    </Button>
                </PopoverContent>
            </Popover>
            
            <AlertDialog>
                <AlertDialogTrigger><Trash className='h-5 w-5 text-red-500' /></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this entry and remove this data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteField()}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default FieldEdit