import MatrixModel from "../interfaces/MatrixModel";
import { MatrixOperations } from "./MatrixOperations";

export class MatrixCalc {
    private matrixMain: number[][];
    private objectiveFunction: number[];
    private restrictions: number[];
    private arrMatrixSolutions: MatrixModel[] = []
    private headRow: string[] = []
    private headColumn: string[] = []

    constructor(matrix: number[][], objectiveFunction: number[], restrictions: number[]){
        this.matrixMain = matrix;
        this.objectiveFunction = objectiveFunction
        this.restrictions = restrictions
        this.addMatrixIdentity()
        this.addobjectiveFunctionMatrix()
        this.addRestrictionsMatrix()
        this.fillHeadRow()
        this.fillHeadColumn()
    }

    private addMatrixIdentity(){
        for (let i = 0; i < this.matrixMain.length; i++) {
            this.matrixMain[i].unshift(0)
            for (let j = 0; j < this.matrixMain.length; j++) {
                if (i == j) {
                    this.matrixMain[i].push(1)
                }else{
                    this.matrixMain[i].push(0)
                }
            }
        }
    }

    private addobjectiveFunctionMatrix(){
        this.changeSignObjectiveFunction()
        const objectiveFunction: number[] = [1]
        
        for (let i = 0; i < this.matrixMain[0].length-1; i++) {
            if(i < this.objectiveFunction.length){
                objectiveFunction.push(this.objectiveFunction[i])
            }else{
                objectiveFunction.push(0)
            }
        }
        
        this.matrixMain.unshift(objectiveFunction)
    }

    private addRestrictionsMatrix(){
        this.matrixMain[0].push(0)
        for (let i = 0; i < this.matrixMain.length-1; i++) {
            this.matrixMain[i+1].push(this.restrictions[i])
        }
    }

    private changeSignObjectiveFunction(){
        for (let i = 0; i < this.objectiveFunction.length; i++) {
            this.objectiveFunction[i] = this.objectiveFunction[i]*-1;
        }
    }

    public result(){
        this.arrMatrixSolutions.push({
            matrix: this.matrixMain,
            headColumn: this.headColumn,
            headRow: this.headRow,
        })

        let matrixResult = new MatrixOperations(this.matrixMain, [...this.headRow], [...this.headColumn]).calculate()

        while(this.verifyPositiveObjectiveFuntion(matrixResult.matrix[0])){
            this.arrMatrixSolutions.push(matrixResult)
            matrixResult = new MatrixOperations(matrixResult.matrix, [...matrixResult.headRow], [...matrixResult.headColumn]).calculate()
        }
        
        this.arrMatrixSolutions.push(matrixResult)

        return this.arrMatrixSolutions
    }

    private verifyPositiveObjectiveFuntion(objectivFunctionC: number[]): boolean{
        let verify = false;
        for (let i = 0; i < objectivFunctionC.length; i++) {
            if(objectivFunctionC[i] < 0){
                verify = true;
                break;
            }
        }

        return verify
    }

    private fillHeadRow(){
        this.headRow.push("Z")
        for (let i = 0; i < this.objectiveFunction.length; i++) {
            this.headRow.push(`X-${i+1}`)
        }

        for (let i = 0; i < this.restrictions.length; i++) {
            this.headRow.push(`S-${i+1}`)
        }
        console.log(this.headRow)
    }

    private fillHeadColumn() {
        this.headColumn.push("Z")
        for (let i = 0; i < this.restrictions.length; i++) {
            this.headColumn.push(`s-${i+1}`)
        }

        console.log(this.headColumn)
    }
}