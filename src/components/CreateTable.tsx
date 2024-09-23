import { ChangeEvent, useEffect, useState } from "react";
import { MatrixCalc } from "../utils/MatrixCalculate";
import MatrixModel from "../interfaces/MatrixModel";
import createFraction from "../utils/createFraction";
import imgLgTecnm from "../../public/images/tecnmLG.png"

export default function CreateTable() {

    const [numVariables, setNumVariables] = useState(0)
    const [numRestrictions, setNumRestrictions] = useState(0)

    const [arrNumVariables, setArrNumVariables] = useState<number[]>([])
    const [arrNumRestrictions, setArrNumRestrictions] = useState<number[][]>([])
    const [arrValueResultRestrictions, setArrValueResultRestrictions] = useState<number[]>([])
    const [saveResults, setSaveResults] = useState<MatrixModel[]>([])

    useEffect(() => {
        setArrNumVariables(Array(numVariables).fill(""))
        setArrNumRestrictions(Array(numRestrictions).fill(Array(numVariables).fill("")))
        setArrValueResultRestrictions(Array(numRestrictions).fill(""))
    }, [numVariables, numRestrictions])

    useEffect(() => {
        const verifyEnd =  arrNumRestrictions.some(row => row.some(value => value.toString() === ""));
        const verifyEndRestricitons = arrValueResultRestrictions.some(value => value.toString() === "")

        if(arrNumRestrictions.length > 0 && arrValueResultRestrictions.length > 0){
            if(!verifyEnd && !verifyEndRestricitons){
                const matrixCalc = new MatrixCalc(JSON.parse(JSON.stringify(arrNumRestrictions)), [...arrNumVariables], [...arrValueResultRestrictions]);
                setSaveResults(matrixCalc.result())
            }
        }

    }, [arrNumRestrictions, arrValueResultRestrictions])

    function changeNumVariables(e: ChangeEvent<HTMLInputElement>){
        const valueToInt = parseInt(e.target.value)
        
        if(!isNaN(valueToInt)){
            setNumVariables(valueToInt)
        }
    }

    function changeNumRestrictions(e: ChangeEvent<HTMLInputElement>){
        const valueToInt = parseInt(e.target.value)
        
        if(!isNaN(valueToInt)){
            setNumRestrictions(valueToInt)
        }
    }

    function changeValueObjectiveFunction(index: number, value: string){
        const arrCopy = [...arrNumVariables]
        arrCopy[index] = parseInt(value)
        setArrNumVariables(arrCopy)
    }

    function changeValueRestriction(numRestriction: number, numVariable: number, value: string){
        const valueInt = parseInt(value)
        const newValuesRestrictions = arrNumRestrictions.map(row => [...row]);


        if(!isNaN(valueInt)){
            if (newValuesRestrictions[numRestriction] && newValuesRestrictions[numRestriction][numVariable] !== undefined) {
                newValuesRestrictions[numRestriction][numVariable] = valueInt;
            }
    
            // Actualizar el estado con la nueva matriz
            setArrNumRestrictions(newValuesRestrictions);
        }else{
            newValuesRestrictions[numRestriction][numVariable] = "";
            setArrNumRestrictions(newValuesRestrictions);
        }
        
    }

    function changeValueResultRestriction(index: number, value: string){
        const arrValueResultRestrictionsCopy = [...arrValueResultRestrictions]
        arrValueResultRestrictionsCopy[index] = parseInt(value)
        setArrValueResultRestrictions(arrValueResultRestrictionsCopy)
    }

  return (
    <div>
        <div className="h-16 flex justify-between items-center">
            <img className="w-12 h-16 p-1" src={imgLgTecnm} alt="logoTecnm" />
            <span className="mx-2 font-bold font-bebas text-2xl">Hecho por Christian</span>
        </div>
        <div className="bg-mainBackground w-full h-96 relative before:contents-[*] before:bg-blackBlur before:w-full before:h-full before:absolute before:z-10">
            <div className="w-full h-full justify-center items-center flex flex-col">
                <h3 className="text-white z-20 relative text-7xl font-bold block font-bebas">
                    Investigación de operaciones<br></br>
                    Método Simplex
                </h3>
            </div>
        </div>
        <div className="">
            <div className="bg-black w-96 mx-auto rounded-md text-white px-4 py-5 mb-4 relative bottom-10">
                <div className="flex flex-col w-full mb-2">
                    <label className="text-start text-sm" htmlFor="">Cantidad de variables</label>
                    <input 
                        className="border border-black w-full outline-none rounded-md p-0.5 text-black" 
                        type="number" 
                        placeholder="Cantidad de variables" 
                        onChange={changeNumVariables}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-start text-sm" htmlFor="">Cantidad de restricciones</label>
                    <input 
                        className="border-black border w-full outline-none rounded-md p-0.5 text-black" 
                        type="number" 
                        placeholder="Cantidad de restricciones" 
                        onChange={changeNumRestrictions}
                    />
                </div>
            </div>
        </div>
        <div className="mb-4 bg-black text-white w-3/4 mx-auto p-3 rounded-md">
            <div>
                <div className="mb-2">
                    <span className="font-bold">Función objetivo</span>
                </div>
                <div className="flex">
                    {arrNumVariables.map((_, index) => (
                        <div key={index} className="flex flex-wrap">
                            <div>
                                <input
                                    type="number"
                                    className="border border-black outline-none text-black w-auto"
                                    onChange={e => {changeValueObjectiveFunction(index, e.target.value)}}
                                    value={arrNumVariables[index]}
                                />
                                <label htmlFor="">
                                    X
                                    <sub>{index+1}</sub>
                                </label>
                            </div>
                            {index%2== 0 ? <span>+</span>: <></>}
                        </div>
                    ))}
                </div>    
            </div>
        </div>
        <div className="bg-black w-3/4 mb-4 rounded-md mx-auto p-3 text-white overflow-x-visible">
            <div>
                <span className="font-bold text-white">Restricciones</span>
            </div>
            {arrNumRestrictions.map((restriction, indexRestriction) => (
                <div className="mb-2 mx-auto" key={indexRestriction}>
                    <span className="text-sm">Restricción número {indexRestriction+1}</span>
                    <div className="flex">
                        {restriction.map((_, indexVariable) => (
                            <div className="flex" key={indexVariable}>
                                <div>
                                    <div>
                                        <input 
                                            type="number"
                                            name={`restriction-${indexVariable}`}
                                            className="text-black w-auto outline-none"
                                            onChange={e => {changeValueRestriction(indexRestriction, indexVariable, e.target.value)}}
                                            value={arrNumRestrictions[indexRestriction][indexVariable]}
                                        />
                                        <label>
                                            X
                                            <sub>{indexVariable+1}</sub>
                                        </label>
                                    </div>
                                </div>
                                {indexVariable%2 === 0 ? <span className="mx-1"> + </span>: <></>}
                            </div>
                        ))}
                        <span className="mx-2">≤</span>
                        <div>
                            <input 
                                type="number" 
                                className="text-black w-auto outline-none"
                                onChange={e => {changeValueResultRestriction(indexRestriction, e.target.value)}}
                                />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="font-bold text-blck p-2 text-center rounded-md w-3/4 mx-auto">
            <div className="mb-2">
                <span className="block">Función objetivo:</span>
                <span>MaxZ=</span>
                {arrNumVariables.map((variable, index) => (
                    <span>
                        {variable}X
                        <sub>{index+1}</sub>
                        {index < arrNumVariables.length-1 ? "+": ""}
                    </span>
                ))}
            </div>
            <div>
                <span>Sujeto A:</span>
                {arrNumRestrictions.map((restriction, index) => (
                    <div>
                        {restriction.map((value, indexValue) => (
                            <span>
                                {value}X
                                <sub>{indexValue+1}</sub>
                                {indexValue < arrNumVariables.length-1 ? "+": ""}
                            </span>
                        ))}
                        <span className="mx-2">≤</span>
                        <span>{arrValueResultRestrictions[index]}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="text-black flex justify-center flex-wrap">
            {saveResults.map(result => (
                <div className="m-3">
                    <table>
                        <thead>
                            <tr className="text-center">
                                <td className="border border-white bg-black p-1.5"></td>
                                {result.headRow.map(head => (
                                    <td className="border border-white p-1.5 text-white bg-black">{head}</td>
                                ))}
                                <td className="border border-white bg-black p-1.5 text-white">R</td>
                            </tr>
                        </thead>
                        <tbody>
                            {result.matrix.map((col, index) => (
                                <tr>
                                    <td className="text-white border border-white bg-black p-1 text-center">
                                        {result.headColumn[index]}
                                    </td>
                                    {col.map(value => (
                                        <td className="border border-black p-1.5 text-black">
                                            {createFraction(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
        <div className="w-3/4 mx-auto text-center p-3">
            <span className="font-bold">Solución optima:</span>
            <div className="flex justify-center">
                {saveResults[saveResults.length-1]?.matrix.map((col, index) => (
                    <span className="block mx-0.5">
                        {saveResults[saveResults.length-1].headColumn[index]}
                        =
                        <p className="font-bold inline-block">{createFraction(col[col.length-1])}</p>
                        ,
                    </span>
                ))}
            </div>
        </div>
    </div>
  )
}
