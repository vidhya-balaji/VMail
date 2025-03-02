import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx"
import './App.css';
function App() {

  const [msg,setmsg] = useState("")
  const [subject,setsubject] = useState("")
  const [status,setstatus] = useState(false)
  const [emailList,setEmailList] = useState([])
  const [emailslide,setemailslide] = useState("")
  const [slide,setslide] = useState("moveleft absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0  sm:rounded-3xl")
  function handlemsg(evt)
  {
    setmsg(evt.target.value)
  }

  function handlesubject(evt)
  {
    setsubject(evt.target.value)
  }

  function handlefile(event)
  {
    const file = event.target.files[0]
  console.log(file)

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
    const totalemail = emailList.map(function(item){return item.A})
    console.log(totalemail)
    setEmailList(totalemail)
   //UsingArrayMap(emailList)
   setemailslide(bindemail(totalemail))
  setslide("moveright absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0  sm:rounded-3xl")
    
  }
  
  reader.readAsBinaryString(file);
  }
  // const arrayList = ['List Item 1', 'List Item 2', 'List Item 3'];

  // const UsingArrayMap = () => (
  //     <div>
  //         {
  //             arrayList.map((item, index) => (
  //                 <div key={index}>{item}</div>
  //             ))
  //         }
  //     </div>
  // );
  function bindemail(totalemail){
    return(<div>
      {
          totalemail.map((item, index) => (
              <div class="text-right">{item}</div>
          ))
      }
  </div>)

  }
  function send()
  {
    setstatus(true)
    axios.post("http://localhost:5000/sendemail",{subject:subject,msg:msg,emailList:emailList})
    .then(function(data)
    {
      if(data.data === true)
      {
        alert("Email Sent Successfully")
        setstatus(false)
       
        Cleanup();
      }
      else{
        alert("Failed")
        setstatus(false)
      }
    })
  }

  function Cleanup(){
    setmsg("")
    setsubject("")
    setemailslide("")
    setslide("moveleft absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0  sm:rounded-3xl")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className= {slide}> 
        
        <div class="relative px-4 py-10 mx-auto  sm:rounded-3xl sm:p-20 text-right text-white">
        <div>
            <h1 className="text-2xl font-semibold">To</h1>
          </div>
        {emailslide}
        </div>
         </div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">V-Mail</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              
                <div className="md:col-span-5">
                  <label htmlFor="full_name">Subject</label>
                  <input type="text"  onChange={handlesubject} value={subject} name="subject" id="subject" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                </div>
  
                <div className="md:col-span-5">
                  <label htmlFor="email">Compose Email</label>
                  <textarea type="text" onChange={handlemsg} value={msg}  name="body" id="body" className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Body" />
                </div>
  
                <div className="md:col-span-3">                 
                  <label htmlFor="address">Attach Document</label>
                  <input type="file" onChange={handlefile} name="file-input" id="file-input" class=" w-full block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                  file:bg-gray-50 file:border-0
                  file:me-4
                  file:py-3 file:px-4
                  dark:file:bg-neutral-700 dark:file:text-neutral-400"></input>
                  {/* <input type="file"  className="border-4  h-10 border mt-1 rounded px-4 w-full bg-gray-50  "></input> */}

                </div>
                
            <div class="relative">
                  <div class="flex items-center justify-center mt-10">
                    <button onClick={send} class="bg-blue-500 text-white rounded-md px-2 py-1 ">{status?"Sending...":"Send"}</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
