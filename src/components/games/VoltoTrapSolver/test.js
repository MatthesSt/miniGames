const board = [1,1,2,0,1,0,1,2,0,1,0,3,2,0,1,1,3,2,0,1,0,1,2,0,1]

function getBoardValues(a,b,c,d,e){
    return [board[a],board[b],board[c],board[d],board[e]]
}
function getValues(arr){
    return {value: arr.reduce((a,b)=>a+b,0),bombs:arr.filter(e=>e == 0).length}
}

const r1 = getValues(getBoardValues(0,1,2,3,4))
const r2 = getValues(getBoardValues(5,6,7,8,9))
const r3 = getValues(getBoardValues(10,11,12,13,14))
const r4 = getValues(getBoardValues(15,16,17,18,19))
const r5 = getValues(getBoardValues(20,21,22,23,24))
const c1 = getValues(getBoardValues(0,5,10,15,20))
const c2 = getValues(getBoardValues(1,6,11,16,21))
const c3 = getValues(getBoardValues(2,7,12,17,22))
const c4 = getValues(getBoardValues(3,8,13,18,23))
const c5 = getValues(getBoardValues(4,9,14,19,24))

function createRowPermutations(obj){
    const nums = [0,1,2,3]
    const result = []
    for(const a of nums){
        for(const b of nums){
            for(const c of nums){
                for(const d of nums){
                    for(const e of nums){
                        if(a+b+c+d+e === obj.value && [a,b,c,d,e].filter(e=>e===0).length === obj.bombs){
                            result.push([a,b,c,d,e])
                        }
                    }
                }
            }
        }
    }
    return result
}

function checkBoardPermutationForColumns(board){
    const col1 = getValues([board[0][0],board[1][0],board[2][0]])
    const col2 = getValues([board[0][1],board[1][1],board[2][1]])
    const col3 = getValues([board[0][2],board[1][2],board[2][2]])
    const col4 = getValues([board[0][3],board[1][3],board[2][3]])
    const col5 = getValues([board[0][4],board[1][4],board[2][4]])
    if(col1.value === c1.value && col1.bombs === c1.bombs){
        if(col2.value === c2.value && col2.bombs === c2.bombs){
            if(col3.value === c3.value && col3.bombs === c3.bombs){
                if(col4.value === c4.value && col4.bombs === c4.bombs){
                    if(col5.value === c5.value && col5.bombs === c5.bombs){
                        return true
                    }
                }
            }
        }
    }
    return false
}
function createBoardPermutationsFromRows(){
    const result = []
    for(const a of createRowPermutations(r1)){
        for(const b of createRowPermutations(r2)){
            for(const c of createRowPermutations(r3)){
                for(const d of createRowPermutations(r4)){
                    for(const e of createRowPermutations(r5)){
                        if(checkBoardPermutationForColumns([a,b,c,d,e])){
                            result.push([a,b,c,d,e])
                        }
                    }
                }
            }
        }
    }
    
    return result
}

const allBoardPermutations = createBoardPermutationsFromRows()
console.log(allBoardPermutations.length)

