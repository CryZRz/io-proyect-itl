export class MatrixOperations {
    private matrixMain: number[][];
    private objectiveFunction: number[];
    private restrictions: number[] = [];
    private indexMaxNegative = 0;
    private indexPivotRow = 0;
    private pivotRowDivOne: number[] = []
    private headRow: string[] = []
    private headColumn: string[] = []

    constructor(matrix: number[][], headRow: string[], headColumn: string[]){
        this.matrixMain = matrix;
        this.objectiveFunction = matrix[0]
        this.headColumn = headColumn
        this.headRow = headRow
        console.log(this.objectiveFunction)
        this.getMatrixRestrictions()
    }

    public calculate(){
        this.findMaxNegative()
        this.findPivotRow()
        this.convertOnePivotRow()
        const matrixResult = this.makeOpCeroRowPivot()
        this.changeVariableInHeads()
        
        return {
            headColumn: this.headColumn,
            headRow: this.headRow,
            matrix: matrixResult
        }
    }

    private findMaxNegative(){
        let maxNegative = this.matrixMain[0][0]
        let index = 0;

        for (let i = 0; i < this.matrixMain[0].length; i++) {
            if(this.matrixMain[0][i] < maxNegative){
                maxNegative = this.matrixMain[0][i]
                index = i
            }
        }

        this.indexMaxNegative = index
    }

    private findPivotRow(){
        let indexRowPivotTemp = 0
        let minNumRowPivotTemo = 0
        let isFirst = false
        
        for (let i = 0; i < this.matrixMain.length; i++) {
            const pivotRowTemp = this.matrixMain[i]
            const columnEnd = this.matrixMain[i][pivotRowTemp.length-1]
            const maxNegativeColumn = this.matrixMain[i][this.indexMaxNegative]

            if(maxNegativeColumn != 0 && maxNegativeColumn > 0){
                if(isFirst){
                    if((columnEnd/maxNegativeColumn) < minNumRowPivotTemo){
                        minNumRowPivotTemo = columnEnd/maxNegativeColumn
                        indexRowPivotTemp = i
                    }
                }else{
                    isFirst = true
                    minNumRowPivotTemo = columnEnd/maxNegativeColumn
                    indexRowPivotTemp = i
                }
            }
        }

        this.indexPivotRow = indexRowPivotTemp
    }

    private convertOnePivotRow(){
        const inverseMult = 1/this.matrixMain[this.indexPivotRow][this.indexMaxNegative]
        const pivotDivOneTemp = []

        for (let i = 0; i <  this.matrixMain[this.indexPivotRow].length; i++) {
            pivotDivOneTemp.push(this.matrixMain[this.indexPivotRow][i]*inverseMult)
        }

        this.pivotRowDivOne = pivotDivOneTemp
        console.log(this.pivotRowDivOne)
    }

    private makeOpCeroRowPivot(){
        const newMatrix = JSON.parse(JSON.stringify(this.matrixMain))
        
        for (let i = 0; i <  this.matrixMain.length; i++) {
            const numToCero = this.matrixMain[i][this.indexMaxNegative]
            const numConvertToCero = numToCero*-1
            
            if(i == this.indexPivotRow){
                newMatrix[i] = this.pivotRowDivOne;
            }
            else if(numToCero != 0){
                for (let j = 0; j < this.matrixMain[i].length; j++) {
                    newMatrix[i][j] = (numConvertToCero*this.pivotRowDivOne[j])+this.matrixMain[i][j];
                }
            }else{
                newMatrix[i] = this.matrixMain[i];
            }    
        }

        return newMatrix
    }

    private getMatrixRestrictions(){
        for (let i = 0; i < this.matrixMain.length; i++) {
            this.restrictions.push(this.matrixMain[i][this.matrixMain[i].length-1])
        }
    }

    private changeVariableInHeads() {
        this.headColumn[this.indexPivotRow] = this.headRow[this.indexMaxNegative]

        console.log(this.headColumn)
    }
}