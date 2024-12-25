

const displayBDTCurrency = (number) =>{
    const formatter = new Intl.NumberFormat('BD-IN',{
        style : 'currency',
        currency : 'BDT',
        minimumFractionDigits : 2       
    })
    return formatter.format(number)
}

export default displayBDTCurrency;