import "./Questions.css";
import { useExpanded, useFilters, useGroupBy, usePagination, useSortBy, useTable } from 'react-table'
import { useEffect, useMemo, useState } from "react";
import { getQuestions } from "../../Services/questionService";
const Questions = () => {
  const [data,setData]=useState();
  
  useEffect(()=>{
    getAllQuestions()
  },[])
  const getAllQuestions=async()=>{
    const questions = await getQuestions()
    setData(questions);
  }
    const columns = useMemo(
      () => [
        {
          Header: 'ID',
          accessor: 'col1', 
        },
        {
          Header: 'Questions Text and Tags',
          accessor: 'col2',
        },
        {
          Header: 'Last Update',
          accessor: 'col3',
        },
        {
          Header: 'Question Type',
          accessor: 'col4',
        },
        {
          Header: '# of Tests',
          accessor: 'col5',
        },
        {
          Header: '',
          accessor: 'opts',
        },
      ],
      []
    )
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
  
    return (
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}                      
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  
};
export default Questions;
