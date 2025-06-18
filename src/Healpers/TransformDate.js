export default function TransformDate(date){
    const selectedDate=new window.Date(date)
    const fulYear=selectedDate.getFullYear()
    const getMonth=selectedDate.getMonth()
    const getDay=selectedDate.getDate().toString().padStart(2,"0")
    
    return`${fulYear}-${getMonth+1}-${getDay}`
}
