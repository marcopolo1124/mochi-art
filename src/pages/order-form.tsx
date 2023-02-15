import React, {useState, ChangeEvent, useEffect} from 'react'
import {FiUpload} from 'react-icons/fi'
import Link from 'next/link'
import { postCommission } from '@/lib'
import { getStatus } from '@/lib'
import { Navbar } from '@/components'
import ReCAPTCHA from "react-google-recaptcha";

type CommissionScope = "bust" | "half-body" | "full-body" | ""
type CommissionType = "sketch" | "colored-sketch" | "full-render" | "vtuber" | ""

type commissionProps = {
    commission_open: boolean,
    art_trade_open: boolean
  }

export async function getServerSideProps(){
    const props = await getStatus()
    return {props}
}

const OrderFormContainer = ({commission_open}: commissionProps) => {
    return (
        <div>
            {commission_open?<OrderForm/>: <h2>Commissions not open yet</h2>}
        </div>
    )
}

const OrderForm = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [commissionScope, setCommissionScope] = useState<string>("bust")
    const [commissionType, setCommissionType] = useState<string>("sketch")
    const [characterName, setCharacterName] = useState<string>("")
    const [numberOfCharcters, setNumberOfCharacters] = useState<number>(1)
    const [details, setDetails] = useState<string>("")
    const [agreed, setAgreed] = useState<boolean>(false)
    const [references, setReferences] = useState<File[]>([]);
    const [human, setHuman] = useState<boolean>(false)
    const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ? process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY: ''

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReferences(prev => e.target.files? [...prev, ...(Array.from(e.target.files))]: [...prev]);
    };

    const removeReference = (index:number) => {
        setReferences(prev => prev.filter((_, i) => i !== index))
        
    }

    const handleCheck = () => {
        setAgreed(prev => !prev)
    }

    const onChange = () => {
        setHuman(true)
    }

    const handleSubmit = (e: React.FormEvent) =>{
        if (!human){
            e.preventDefault()
            return
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("scope", commissionScope)
        formData.append("comType", commissionType)
        formData.append("details", details)
        formData.append("characterName", characterName)
        formData.append("numberOfCharacters", numberOfCharcters.toString())
        references.forEach(file => {
            formData.append("references", file)
        })
        postCommission(formData)
      }

    return (
        <>
        <Navbar/>
        <div className='layout'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
                name='name'
                id='name'
                type={"text"}
                onChange={(e) => {setName(e.target.value)}}
                required
            />
            <label htmlFor='email'>Email:</label>
            <input
                name='email'
                id='email'
                type={"email"}
                onChange={(e) => {setEmail(e.target.value)}}
                required
            />
            <label htmlFor='character-name'>Character Name:</label>
            <input 
                name='character-name'
                id='character-name'
                type={"text"}
                value={characterName}
                onChange={(e) => {setCharacterName(e.target.value)}}
            />
            <label htmlFor='number-of-characters'>Number of characters:</label>
            <input
                name="number-of-characters"
                id="number-of-characters"
                type={"number"}
                min={0}
                value={numberOfCharcters.toString()}
                onChange={(e) => {setNumberOfCharacters(parseInt(e.target.value))}}
            />
            <label htmlFor="scope">Select a scope:</label>
                <select id="scope" name="scope" onChange={(e) => {setCommissionScope(e.target.value)}}>
                    <option value="bust">Bust</option>
                    <option value="half-body">Half Body</option>
                    <option value="full-body">Full Body</option>
                </select>
            <label htmlFor="type">Select a type:</label>
                <select id="type" name="type" onChange={(e) => {setCommissionType(e.target.value)}}>
                    <option value="sketch">Sketch</option>
                    <option value="colored-sketch">Colored Sketch</option>
                    <option value="full-render">Full Render</option>
                    <option value="vtuber">Vtuber</option>
                </select>
            <label htmlFor='additional-details'>Additional details (include links to any reference):</label>
            <textarea name='additional-details' onChange={(e) => {setDetails(e.target.value)}}/>
            <div className="file-upload">
                <label htmlFor="references" className='upload-label'><FiUpload/> Upload reference files</label>
                <input type="file" id="references" onChange={handleFileChange} name="references" multiple />
                {references.map((reference, index) => <FileContainer file={reference} index={index} removeReference={removeReference}/>)}
            </div>
            
            <input name="agree" type={"checkbox"} onChange={handleCheck} checked={agreed} required/>
            <label htmlFor="agree">I have read and agreed to the <Link href="/terms-of-service"><span className="terms-link">terms of service</span></Link></label>
            <ReCAPTCHA
                sitekey={siteKey}
                onChange={onChange}
            />

            <input type={"submit"} value="SUBMIT"/>
                
            
        </form>
        </div>
        </>
    )
}

type rmfn = (index: number) => void
type fileProps = {
    file: File,
    removeReference: rmfn,
    index: number
}



function FileContainer({file, removeReference, index}: fileProps) {
    const handleClick = () =>{
        removeReference(index)
    }
    return (
            <div className="file-container"><p>{file.name}</p><span onClick={handleClick}>&times;</span></div>
    )
    
}

export default OrderFormContainer

