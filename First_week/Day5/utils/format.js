export const money = (n) => Number(n.toFixed(2)).toFixed(2)
export const quality_money =(n) =>{
    return(Math.round((n + Number.EPSILON)*100)/100).toFixed(2)
} 