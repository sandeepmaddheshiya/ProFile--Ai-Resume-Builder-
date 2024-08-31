import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import EducationalPreview from "./preview/EducationalPreview";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import ProfessionalExperiencePreview from "./preview/ProfessionalExperiencePreview";
import SkillsPreview from "./preview/SkillsPreview";
import SummaryPreview from "./preview/SummaryPreview";

function ResumePreview() {
const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
// console.log("first name:"+resumeInfo.firstName)

  return (
    <div className="shadow-lg h-full border-t-[20px] p-14" style={{borderColor:resumeInfo?.themeColor}}>
    {/* Personal Detail */}
    <PersonalDetailPreview resumeInfo={resumeInfo}/>


    {/* Summary */}
    <SummaryPreview resumeInfo={resumeInfo}/>

    {/* Professional Experience */}
    <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>

    {/* Educational Details */}
    <EducationalPreview resumeInfo={resumeInfo}/>

    {/* Skills */}
    <SkillsPreview resumeInfo={resumeInfo}></SkillsPreview>
    </div>
    // <div>
    //   <ReactTask/>
    // </div>
  )
}

export default ResumePreview