import React from 'react'

export const Datalist: any = ( data ) => {
    const excelData = data.data
    const {header,body}:{header:any,body:any}=data
    console.log("tsx",excelData)
    console.log("tsx",Object.keys(excelData[0]))
    console.log("header",header)
    console.log("body",body)
    const headers:String[] = Object.keys(excelData[0])
    return (
        <div>
            {excelData.length>0? excelData.map((item)=>{
                <div>

                <div className='' >{header}</div>
                <div className='' >{body}</div>
</div>
            }) : 'No file selected'}
            
        </div>
    )
}