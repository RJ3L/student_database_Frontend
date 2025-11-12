"use client";

import React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Popup from 'reactjs-popup';
import * as Student from '../components/students';
import { fetchStudent } from '../components/students';
import '../../public/components.css';
import { format } from 'date-fns';

interface Student {
    id: number;
    Surname: string;
    FirstName: string;
    MiddleName: string;
    Age: number;
    Birthday: Date;
    ContactNumber: number;
    Email: string;
    Remarks: string;
}

function StudentsPage() {
    
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [searchTerm, setSearchTerm] = useState("");

    const fetchStudents = useCallback (async () => {
        setIsLoading(true);
        try {
            const data: Student[] = await Student.getStudents();
            setStudents(data);
        } catch (err) {
            console.error("Failed to fetch students: ", err);
        } finally {
            setIsLoading(false); 
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const displayedStudents = useMemo(() => {
        let filtered = [...students];

        if(searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();

            filtered = filtered.filter(student => {
                return student.Surname?.toLowerCase().includes(lowerCaseSearch);
            });
        }
        return filtered;
    }, [students, searchTerm]);

    const [isAscending, setIsAscending] = useState(true);
    const toggleSortDirection = () => {
        setIsAscending(currentValue => !currentValue);
    }
    const sortColumn = (columnName : string) => {
        const sortedStudents = [...students];
        if(isAscending) {
                switch(columnName) {
        case 'Surname':
            sortedStudents.sort((a: Student, b: Student) => a.Surname.localeCompare(b.Surname));
            setStudents(sortedStudents);
            break;
        
        case 'Firstname':
            sortedStudents.sort((a: Student, b: Student) => a.FirstName.localeCompare(b.FirstName));
            setStudents(sortedStudents);
            break;

        case 'Middlename':
            sortedStudents.sort((a: Student, b: Student) => {
                const aValue = a.MiddleName;
                const bValue = b.MiddleName;

                if (aValue == null && bValue == null) return 0;
                if (aValue == null) return 1;
                if (bValue == null) return -1;

                return aValue.localeCompare(bValue);
            });
            setStudents(sortedStudents);
            break;
        
        case 'Email':
            sortedStudents.sort((a: Student, b: Student) => a.Email.localeCompare(b.Email));
            setStudents(sortedStudents);
            break;

        case 'Age':
            sortedStudents.sort((a: Student, b: Student) => {
                return a.Age - b.Age;
            });
            setStudents(sortedStudents);
            break;

        case 'ContactNumber':
            sortedStudents.sort((a: Student, b: Student) => {
                return a.ContactNumber - b.ContactNumber;
            });
            setStudents(sortedStudents);
            break;

        case 'Birthday':
            sortedStudents.sort((a: Student, b: Student) => {
                return new Date(a.Birthday) - new Date(b.Birthday);
            });
            setStudents(sortedStudents);
            break;
        default:
            break;
    } 
        } 
        else {
                switch(columnName) {
        case 'Surname':
            sortedStudents.sort((a: Student, b: Student) => b.Surname.localeCompare(a.Surname));
            setStudents(sortedStudents);
            break;
        
        case 'Firstname':
            sortedStudents.sort((a: Student, b: Student) => b.FirstName.localeCompare(a.FirstName));
            setStudents(sortedStudents);
            break;

        case 'Middlename':
            sortedStudents.sort((a: Student, b: Student) => {
                const aValue = a.MiddleName;
                const bValue = b.MiddleName;

                if (aValue == null && bValue == null) return 0;
                if (aValue == null) return 1;
                if (bValue == null) return -1;

                return bValue.localeCompare(aValue);
            });
            setStudents(sortedStudents);
            break;
        
        case 'Email':
            sortedStudents.sort((a: Student, b: Student) => b.Email.localeCompare(a.Email));
            setStudents(sortedStudents);
            break;

        case 'Age':
            sortedStudents.sort((a: Student, b: Student) => {
                return b.Age - a.Age;
            });
            setStudents(sortedStudents);
            break;

        case 'ContactNumber':
            sortedStudents.sort((a: Student, b: Student) => {
                return b.ContactNumber - a.ContactNumber;
            });
            setStudents(sortedStudents);
            break;

        case 'Birthday':
            sortedStudents.sort((a: Student, b: Student) => {
                return new Date(b.Birthday) - new Date(a.Birthday);
            });
            setStudents(sortedStudents);
            break;
        default:
            break;
    } 
        }

    }

    if (isLoading) {
        return <div> Loading... </div>;
    } 
  return (
    <>
    <div>
        <div style={{display:'flex', flexDirection:'row', gap:'64vh'}}>
            <Popup trigger = {<button style={{borderRadius: '3vh', padding: '1.5vh', backgroundColor: '#D2C1B6', color:'black', fontFamily:'Inter'}}>  New Student </button>} position="right center" modal nested> 
                            {close => (<div style={{backgroundColor:'#D2C1B6', padding: '5vh', width: '65vh', borderRadius:'2vh'}}>
                            <div style={{fontFamily:'itim', color: '#1B3C53', fontSize:'40px'}}> Create Student </div> 
                            <form onSubmit=  { async(event) => {event.preventDefault(); 
                                    const formData = new FormData(event.currentTarget);


                                    try {
                                        const result = await Student.createStudent(formData);
                                        if (result) {
                                            close();

                                            await fetchStudents();
                                        } else {
                                            setError(err.message);
                                        }
                                    }catch (err) {
                                console.error(err);
                                setError(err.message);
                              }
                            }}>
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Surname: </p> <input type = "text" name = "Surname" className="popupTextbox"/>  <br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Firstname: </p> <input type = "text" name = "Firstname" className="popupTextbox"/> <br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Middlename: </p> <input type = "text" name = "Middlename" className="popupTextbox"/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Age: </p> <input type = "number" name = "Age" className="popupTextbox" style={{width: '8vh'}}/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Birthday: </p> <input type = "date" name = "Birthday" className="popupTextbox" style={{width: '18vh'}}/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Contact Number: </p> <input type = "text" name = "Contactnumber" className="popupTextbox"/><br/>
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Email: </p> <input type = "text" name = "Email" className="popupTextbox"/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Remarks: </p> <input type = "text" name = "Remarks" className="popupTextbox"/><br />
                                <br/>
                                <div style={{display:'flex', flexDirection:'row', gap:'1vh'}}>
                                <button type="submit" style={{backgroundColor: '#456882', padding:'1vh', borderRadius:'1vh'}}>Save Changes</button>
                                <button style={{backgroundColor: '#D31010', padding:'1vh', borderRadius:'1vh'}} onClick={() => { close();}}> Cancel</button>
                                </div>
                                {error && <p style={{color: 'red'}}> Error: {error}</p>}
                            </form>
                            </div>)}</Popup>

      <h1 style={{fontSize:'40px', fontFamily:'Itim'}}> Student List </h1>  
      <input type="text" placeholder='Search...'  style={{backgroundColor: '#D9D9D9', color:'black', borderRadius:'2vh', width: '35vh', padding: '2vh'}} value ={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/> 
    </div>
        <br />
    <button onClick = {toggleSortDirection} style={{borderRadius: '1vh', padding: '1.5vh', backgroundColor: '#D2C1B6', color:'black', fontFamily:'Inter'}} > {isAscending ? 'Sort (A-Z, 0-9)' : 'Sort (Z-A, 9-0)'} </button> < br/>< br/>
        <table style={{ width: '100%', border: '1px solid white'}}>
            <thead>
                <tr>
                    <th> <button onClick={() => sortColumn('Surname')}> Surname </button> </th>
                    <th> <button onClick={() => sortColumn('Firstname')}> Firstname </button> </th>
                    <th> <button onClick={() => sortColumn('Middlename')}> Middlename </button> </th>
                    <th> <button onClick={() => sortColumn('Age')}> Age </button> </th>
                    <th> <button onClick={() => sortColumn('Birthday')}> Birthday </button> </th>
                    <th> <button onClick={() => sortColumn('ContactNumber')}> Contact Number </button> </th>
                    <th> <button onClick={() => sortColumn('Email')}> Email </button></th>
                    <th> Remarks </th>
                    <th colSpan={'2'}> Archive </th>
                </tr>
            </thead>
            <tbody>
                {displayedStudents.map((student) => (
                    <tr key = {student.ID} >
                        <td> {student.Surname}</td>
                        <td> {student.FirstName}</td>
                        <td> {student.MiddleName}</td>
                        <td> {student.Age}</td>
                        <td> {format(new Date(student.Birthday), 'yyyy-MM-dd')}</td>
                        <td> {student.ContactNumber}</td>
                        <td> {student.Email}</td>
                        <td> {student.Remarks}</td>
                         <td> 
                            <Popup trigger = {<button>  Update </button>} position="right center" modal nested> 
                            {close => (<div style={{backgroundColor:'#D2C1B6', padding: '5vh', width: '65vh', borderRadius:'2vh'}}>
                            <div style={{fontFamily:'itim', color: '#1B3C53', fontSize:'40px'}}> Update Student Info </div> 
                            <form onSubmit=  { async(event) => {event.preventDefault(); 
                                    const formData = new FormData(event.currentTarget);

                                    try {
                                        const result = await Student.updateStudent(formData);
                                        if (result) {
                                        close();

                                        await fetchStudents();
                                        } else {
                                           setError(err.message); 
                                        }
                                    }catch (err) {
                                console.error(err);
                                setError(err.message);
                              }
                            }}>
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Surname: </p> <input type = "text" name = "Surname" defaultValue = {student.Surname} className="popupTextbox"/>  <br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Firstname: </p> <input type = "text" name = "Firstname" defaultValue = {student.FirstName} className="popupTextbox"/> <br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Middlename: </p> <input type = "text" name = "Middlename" defaultValue = {student.MiddleName} className="popupTextbox"/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Age: </p> <input type = "number" name = "Age" defaultValue = {student.Age} className="popupTextbox" style={{width: '8vh'}}/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Birthday: </p> <input type = "date" name = "Birthday" defaultValue = {format(new Date(student.Birthday), 'yyyy-MM-dd')} className="popupTextbox" style={{width: '18vh'}}/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Contact Number: </p> <input type = "text" name = "Contactnumber" defaultValue = {student.ContactNumber} className="popupTextbox"/><br/>
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Email: </p> <input type = "text" name = "Email" defaultValue = {student.Email} className="popupTextbox"/><br />
                                <p style={{fontFamily:'itim', color: '#1B3C53', fontSize:'16px'}}> Remarks: </p> <input type = "text" name = "Remarks" defaultValue = {student.Remarks} className="popupTextbox"/><br />
                                <input type ="hidden" name = "ID" value = {student.ID} /> <br />
                                <div style={{display:'flex', flexDirection:'row', gap:'1vh'}}>
                                    <br />
                                <button type="submit" style={{backgroundColor: '#456882', padding:'1vh', borderRadius:'1vh'}}>Save Changes</button>
                                <button style={{backgroundColor: '#D31010', padding:'1vh', borderRadius:'1vh'}} onClick={() => { close();}}> Cancel</button>
                                </div>
                                {error && <p style={{color: 'red'}}> Error: {error}</p>}
                            </form>
                            </div>)}</Popup> </td>
                        <td> <button onClick = {async() => {Student.deleteStudent(student.ID); await fetchStudents();} }> Delete </button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}




export default StudentsPage
