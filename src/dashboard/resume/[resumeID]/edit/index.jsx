import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import dummy from "./../../../../data/dummy";

function EditResume() {
const params=useParams();
const[resumeInfo, setResumeInfo]=useState(dummy);
useEffect(()=>{
// console.log(params.resumeId);
setResumeInfo(dummy);
// console.log(dummy.firstName,dummy.lastName)
},[])
    
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
    {/* FormSection */}
    <FormSection/>

    {/* PreviewSection */}
    <ResumePreview/>
    
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume