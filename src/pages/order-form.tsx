import React, {useState, ChangeEvent, useEffect} from 'react'
import {FiUpload} from 'react-icons/fi'

type CommissionScope = "bust" | "half-body" | "full-body" | null
type CommissionType = "sketch" | "colored-sketch" | "full-render" | "vtuber" | null

const OrderForm = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [commissionScope, setCommissionScope] = useState<CommissionScope>(null)
    const [commissionType, setCommissionType] = useState<CommissionType>(null)
    const [characterName, setCharacterName] = useState<string>("")
    const [numberOfCharcters, setNumberOfCharacters] = useState<number>(1)
    const [details, setDetails] = useState<string>("")
    const [references, setReferences] = useState<File[]>([]);
    useEffect(() => {
        console.log(references)
    }, [references])
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReferences(prev => e.target.files? [...prev, ...(Array.from(e.target.files))]: [...prev]);
    };
    return (
        <div>
            <form>
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
                    <select id="scope" name="scope">
                        <option value="bust">Bust</option>
                        <option value="half-body">Half Body</option>
                        <option value="full-body">Full Body</option>
                    </select>
                <label htmlFor="type">Select a type:</label>
                    <select id="type" name="type">
                        <option value="sketch">Sketch</option>
                        <option value="colored-sketch">Colored Sketch</option>
                        <option value="full-render">Full Render</option>
                        <option value="vtuber">Vtuber</option>
                    </select>
                <label htmlFor='additional-details'>Additional details:</label>
                <textarea name='additional-details' onChange={(e) => {setDetails(e.target.value)}}/>
                <div className="file-upload">
                    <label htmlFor="references" className='upload-label'><FiUpload/> Upload reference files</label>
                    <input type="file" id="references" onChange={handleFileChange} name="references" multiple />
                    {references.map(reference => <p>{reference.name}</p>)}
                </div>
                

                <input type={"submit"} value="SUBMIT"/>
                    
                
            </form>
        </div>
    )
}

export default OrderForm

