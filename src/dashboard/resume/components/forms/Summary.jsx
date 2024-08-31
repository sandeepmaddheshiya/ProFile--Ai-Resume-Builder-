import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import AIChatSession from "./../../../../../service/AIModal";
import GlobalApi from "./../../../../../service/GlobalApi";

const prompt='Job Title: {jobTitle}. Depends on my job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and Summery with Experience level for fresher, Mid-Level, Experienced';

function Summary({enableNext}) {
  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
const [summery,setSummeryInput]=useState();
const [loading,setLoading]=useState(false);
const params=useParams();
const [aiGeneratedSummaryList,setAiGeneratedSummaryList]=useState();

useEffect(()=>{
  summery&&setResumeInfo({
    ...resumeInfo,
    summery:summery
  })
},[summery])

const GenerateSummeryFromAi=async()=>{
  setLoading(true);
  const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
  // console.log(PROMPT);
  const result =await AIChatSession.sendMessage(PROMPT);
  // console.log(result.response.text())
  console.log(JSON.parse(result.response.text()))
  setAiGeneratedSummaryList(JSON.parse(result.response.text()));
  setLoading(false);
}

const onSave=(e)=>{
  e.preventDefault();
  setLoading(true);
  const data={
      data:{
        summery:summery
      }
  }
  GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
      // console.log(res);
      enableNext(true);
      setLoading(false);
      toast("Details updated")
  },(error)=>{
      setLoading(false);
  });
  
}

  return (
    <div>
    
    <div  className="p-5 shadow-lg rounded-lg border border-t-primary border-t-4 mt-10">
    <h2 className="font-bold text-lg">Summary</h2>
    <p>Add Summary for your job title</p>
    <form className="mt-7" onSubmit={onSave}>
      <div className="flex justify-between items-end">
        <label>Add Summary</label>
        <Button size='sm' variant='outline' onClick={()=>GenerateSummeryFromAi()} type='button' className="border-primary text-primary flex gap-2"><Brain className="h-4 w-4"/>Generate from AI</Button>
      </div>
      <Textarea className="mt-5" required
onChange={
  (e)=>setSummeryInput(e.target.value)
}

      />
      <div className="mt-2 flex justify-end">
      <Button type='submit' disabled={loading}>{loading?<LoaderCircle className="animate-spin"/>:'Save'}</Button>
      </div>
    </form>
    </div>
    {aiGeneratedSummaryList&&<div>
      <h2 className="font-bold text-lg">Suggestions</h2>
      {aiGeneratedSummaryList.map((item,index)=>(
        <div>
          <h2 className="font-bold my-1">Level: {item?.experienceLevel}</h2>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>}


    </div>
    
  )
}

export default Summary