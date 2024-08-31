
function PersonalDetailPreview({resumeInfo}) {
    // console.log("first name: "+resumeInfo.firstName,"last name: "+resumeInfo.lastName);
  return (
    <div>
    <h2 className="font-bold text-xl text-center" 
    style={{
        color:resumeInfo?.themeColor
    }}
    >{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
    <h2 className="font-md text-sm text-center">{resumeInfo?.jobTitle} </h2>
    <h2 className="font-normal text-xs text-center"
    style={{
        color:resumeInfo?.themeColor
    }}
    >{resumeInfo?.address} </h2>
<div className="flex justify-between">
    <h2 className="font-normal text-xs"
    style={{
        color:resumeInfo?.themeColor
    }}>{resumeInfo?.phone}</h2>
    <h2 className="font-normal text-xs"
    style={{
        color:resumeInfo?.themeColor
    }}>{resumeInfo?.email }</h2>
</div>
<hr className="border-[1.5px] my-2" style={
    {borderColor:resumeInfo?.themeColor}
}/>

    </div>
  )
}

export default PersonalDetailPreview