import {fraction} from "mathjs"

export default function createFraction(num: number){
    const fractionToExport = fraction(num);
    let finalFraction = fractionToExport.s < 0 ? "-" : ""

    if(fractionToExport.d != 1){
        return finalFraction+=`${fractionToExport.n}/${fractionToExport.d}`
    }
    
    return finalFraction+=fractionToExport.n.toString()
}