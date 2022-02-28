import "./Questions.css";
import React, { useEffect,   useState } from "react";
import { getQuestions } from "../../Services/questionService";
import {Link} from "react-router-dom";
import Table from "../../Components/Table";
import { Btn } from "../../GlobalComponents";
const Questions = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await getQuestions();
      setData(result);
    })();
  }, []);
  const handleOnEdit=(cell)=>{
console.log(cell)
  }
  const columns = [
    {
      Header: "ID",
      accessor: "Id",
    },
    {
      Header: "Question Text ",
      accessor: "Text",
    },
    {
      Header: "Last Update",
      accessor: "LastUpdate",
    },
    {
      Header: "question Type",
      accessor: "Type",
    },{
      Header:"",
      accessor:"options",
      Cell:({cell})=><Link to={{pathname:"/edit-question",question:cell.row.values}}><Btn onClick={()=>console.log(cell.row.values)}>edit</Btn></Link>
    }
    
  ];

  return <div className="Questions"><Table columns={columns} data={data}/></div>;
};
export default Questions;