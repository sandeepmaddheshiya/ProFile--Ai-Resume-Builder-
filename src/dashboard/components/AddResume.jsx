import { Loader2, PlusSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "./../../../service/GlobalApi";

    

function AddResume() {
    const[openDialog,setOpenDialog]=useState(false);
    const[resumeTitle,setResumeTitle]=useState();
    const[loading,setLoading]=useState(false);
    const navigation =useNavigate();

    const {user}=useUser();


    const onCreate= async()=>{
        setLoading(true);
        const uuid=uuidv4();
        // console.log(resumeTitle,uuid);
        const data={
            data:{
                title:resumeTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
            }
        }
        GlobalApi.CreateNewResume(data).then(res=>{
            console.log(res.data.data.documentId);
            if(res){
                setLoading(false);
                navigation('/dashboard/resume/'+res.data.data.documentId+'/edit')
            }
        },(error)=>{
            setLoading(false);
        });
    }

  return (
    <div>
    <div className="p-14 py-24 
    border 
    items-center
     flex justify-center 
     bg-secondary 
     rounded-lg 
     h-[280px] 
     hover:scale-105 
     transition-all 
     hover:shadow-md 
     cursor-pointer 
     border-dashed"
     onClick={()=>setOpenDialog(true)}
     >
        <PlusSquare/>
    </div>
    <Dialog open={openDialog}>
     {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
         <DialogHeader>
        <DialogTitle>Create New Resume</DialogTitle>
        <DialogDescription>
        <p>Add a title for your new resume</p>
        <Input className="my-2" placeholder="Ex. Full Stack Developer Resume" onChange={(e)=>setResumeTitle(e.target.value)}/>
      </DialogDescription>
      <div className="flex justify-end gap-5">
        <Button variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
        <Button disabled={!resumeTitle || loading} onClick={()=>onCreate()}> {loading? 
        <Loader2 className="animate-spin"/>:'Create'}
        </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  )
}

export default AddResume