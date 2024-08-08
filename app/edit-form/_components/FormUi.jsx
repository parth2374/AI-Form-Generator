import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FieldEdit from './FieldEdit'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import moment from 'moment'
import { toast } from 'sonner'
import { SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const FormUi = ({ enabledSignIn=false, formId=0, editable=true, jsonForm, onFieldUpdate, deleteField, selectedTheme, selectedStyle }) => {

    const [formData, setFormData] = useState();
    let formRef = useRef();
    const { user, isSignedIn } = useUser();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)

        const result = await db.insert(userResponses)
        .values({
            jsonResponse: formData,
            createdAt: moment().format('DD/MM/yyy'),
            formRef: formId
        })

        if (result) {
            formRef.reset();
            toast('Response submitted successfully!')
        } else {
            toast('Error while saving your form!')
        }
    }

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCheckboxChange = (fieldName, itemName, value) => {
        const list = formData?.[fieldName]? formData?.[fieldName]:[];
        console.log(list)
        if (value) {
            list.push({
                fieldLabel: itemName,
                value: value
            })
            setFormData({
                ...formData,
                [fieldName]: list
            })
        } else {
            const result = list?.filter((item) => item?.fieldLabel === itemName)
            setFormData({
                ...formData,
                [fieldName]: result
            })
        }
        console.log(formData);
    }

    return (
        <>
            { selectedStyle?.name == 'Retro'?
            <form ref={(e) => formRef = e} onSubmit={onFormSubmit} className='p-5 md:w-[600px] rounded-lg' style={{ borderWidth: selectedStyle?.value, borderColor: 'InfoText' }} data-theme={selectedTheme}>
                <div className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>
                    <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
                </div>
                <h2 className='text-sm mt-2 text-[#708090] text-center'>{jsonForm?.formSubheading}</h2>

                { 
                    jsonForm?.formFields?.map((field, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            {
                                field.fieldType == 'select' ?
                                    <div className='my-3 w-full'>
                                        <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                        <Select required={field?.required} onValueChange={(v) => handleSelectChange(field?.fieldName, v)}>
                                            <SelectTrigger className="w-full mt-2 text-gray-500 bg-gray-300">
                                                <SelectValue placeholder={field?.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent className='bg-black text-white'>
                                                {
                                                    field?.options?.map((item, index) => (
                                                        <SelectItem className='bg-transparent' key={index} value={item}>{item}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                :
                                    field?.fieldType == 'radio' ?
                                        <div className='w-full my-3'>
                                            <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                            <RadioGroup className='mt-3' required={field?.required}>
                                                {
                                                    field?.options?.map((item, index) => (
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value={item?.label} id={item?.label} onClick={() => handleSelectChange(field?.fieldName, item?.label)} />
                                                            <Label className='mt-1' htmlFor={item?.label}>{item?.label}</Label>
                                                        </div>
                                                    ))
                                                }
                                            </RadioGroup>
                                        </div>
                                :
                                    field?.fieldType == 'checkbox' ?
                                        <div className='my-3 w-full'>
                                            <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                            {
                                                field?.options?
                                                    field?.options?.map((item, index) => (
                                                        <div className='flex gap-2 mt-2 items-center' key={index}>
                                                            <Checkbox onCheckedChange={(v) => handleCheckboxChange(field?.fieldLabel, item?.label, v)} />
                                                            { item?.label? <h2 className='text-[#708090]'>{item?.label}</h2>
                                                            :<h2 className='text-[#708090]'>{item}</h2>}
                                                        </div>
                                                    ))
                                                :
                                                    <div className='flex gap-2'>
                                                        <Checkbox required={field?.required} />
                                                        <h2 className='text-[#708090]'>{field?.label}</h2>
                                                    </div>
                                            }
                                        </div>
                                :
                                    <div className='my-3 w-full'>
                                        <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                        <Input
                                            className='mt-2 bg-gray-300 text-black'
                                            type={field?.fieldType}
                                            placeholder={field?.placeholder}
                                            name={field?.fieldName}
                                            onChange={(e) => handleInputChange(e)}
                                            required={field?.required}
                                        />
                                    </div>
                            }
                            { editable && <div>
                                <FieldEdit
                                    defaultValue={field}
                                    onUpdate={(value) => onFieldUpdate(value, index)}
                                    deleteField={() => deleteField(index)}
                                />
                            </div> }
                        </div>
                    ))
                }
                { !enabledSignIn ?
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    :
                    isSignedIn ?
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        :
                        <Button>
                            <SignInButton mode='modal'>Sign In before submitting</SignInButton>
                        </Button>
                }
            </form>

            :















            <form ref={(e) => formRef = e} onSubmit={onFormSubmit} className='p-5 md:w-[600px] rounded-lg' style={{ border: selectedStyle?.value }} data-theme={selectedTheme}>
                <div className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>
                    <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
                </div>
                <h2 className='text-sm mt-2 text-[#708090] text-center'>{jsonForm?.formSubheading}</h2>

                { 
                    jsonForm?.formFields?.map((field, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            {
                                field.fieldType == 'select' ?
                                    <div className='my-3 w-full'>
                                        <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                        <Select required={field?.required} onValueChange={(v) => handleSelectChange(field?.fieldName, v)}>
                                            <SelectTrigger className="w-full mt-2 text-gray-500 bg-gray-300">
                                                <SelectValue placeholder={field?.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent className='bg-black text-white'>
                                                {
                                                    field?.options?.map((item, index) => (
                                                        <SelectItem className='bg-transparent' key={index} value={item}>{item}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                :
                                    field?.fieldType == 'radio' ?
                                        <div className='w-full my-3'>
                                            <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                            <RadioGroup className='mt-3' required={field?.required}>
                                                {
                                                    field?.options?.map((item, index) => (
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value={item?.label} id={item?.label} onClick={() => handleSelectChange(field?.fieldName, item?.label)} />
                                                            <Label className='mt-1' htmlFor={item?.label}>{item?.label}</Label>
                                                        </div>
                                                    ))
                                                }
                                            </RadioGroup>
                                        </div>
                                :
                                    field?.fieldType == 'checkbox' ?
                                        <div className='my-3 w-full'>
                                            <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                            {
                                                field?.options?
                                                    field?.options?.map((item, index) => (
                                                        <div className='flex gap-2 mt-2 items-center' key={index}>
                                                            <Checkbox onCheckedChange={(v) => handleCheckboxChange(field?.fieldLabel, item?.label, v)} />
                                                            { item?.label? <h2 className='text-[#708090]'>{item?.label}</h2>
                                                            :<h2 className='text-[#708090]'>{item}</h2>}
                                                        </div>
                                                    ))
                                                :
                                                    <div className='flex gap-2'>
                                                        <Checkbox required={field?.required} />
                                                        <h2 className='text-[#708090]'>{field?.label}</h2>
                                                    </div>
                                            }
                                        </div>
                                :
                                    <div className='my-3 w-full'>
                                        <label className='text-xs mb-6 text-[#708090]'>{field?.fieldLabel}</label>
                                        <Input
                                            className='mt-2 bg-gray-300 text-black'
                                            type={field?.fieldType}
                                            placeholder={field?.placeholder}
                                            name={field?.fieldName}
                                            onChange={(e) => handleInputChange(e)}
                                            required={field?.required}
                                        />
                                    </div>
                            }
                            { editable && <div>
                                <FieldEdit
                                    defaultValue={field}
                                    onUpdate={(value) => onFieldUpdate(value, index)}
                                    deleteField={() => deleteField(index)}
                                />
                            </div> }
                        </div>
                    ))
                }
                { !enabledSignIn ?
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    :
                    isSignedIn ?
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        :
                        <Button>
                            <SignInButton mode='modal'>Sign In before submitting</SignInButton>
                        </Button>
                }
            </form>
            }
        </>
    )
}

export default FormUi