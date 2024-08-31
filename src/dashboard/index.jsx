import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import GlobalApi from "./../../service/GlobalApi";
import AddResume from "./components/AddResume";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const {user}=useUser();
  const[resumeList,setResumeList]=useState([]);

  useEffect(()=>{
    user&&GetResumeList();
  },[user]);

  //Used to create users resume list
  const GetResumeList=()=>{
GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(res=>{
  // console.log(res.data);
  setResumeList(res.data.data);
})
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
    <h2 className="font-bold text-3xl">My Resume</h2>
    <p>Start Creating Your Resume using AI For Your Next Job Role</p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
      <AddResume/>
      {resumeList.length>0&&resumeList.map((resume,index)=>(
        <ResumeCardItem resume={resume} key={index}/>
      ))}
    </div>
    </div>
  )
}

export default Dashboard