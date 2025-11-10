"use server";

function calculateAge(birthdate: Date): number {
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}

/* async function checkUniqueness(
    email: string | null,
    contactNumber: string | null,
    Id: number | null = null
) {
    const whereQuery: any = { OR: []};
    if (email) {
        whereQuery.OR.push({ Email: email});
    } 
    if (contactNumber) {
        whereQuery.OR.push({ ContactNumber: contactNumber});
    }

    if(whereQuery.OR.length === 0) {
        return;
    }

    if(Id !== null) {
        whereQuery.NOT = {ID: Id};
    }

    const existingStudent = await 
} */


export async function getStudents() {
    try {
    const res = await fetch(`http://localhost:5073/api/values/GetAllValues`, {method: 'GET', cache: 'no-store',});

    if(!res.ok) {
        throw new Error('Failed to fetch data from API');
    }
    return res.json();
    }
    catch(error) {
        console.error("Fetch error: ", error);
        return[]; 
    }
}

export async function fetchStudent(surname: string) {
    try {
    const res = await fetch(`http://localhost:5073/api/values/SingleFetch/${surname}`, {method: 'GET', cache: 'no-store',});

    if(!res.ok) {
        throw new Error('Failed to fetch data from API');
    }
    return res.json();
    }
    catch(error) {
        console.error("Fetch error: ", error);
        return[];
    }
}

export async function fetchStudentViaID(ID: number) {
    try {
    const res = await fetch(`http://localhost:5073/api/values/SingleFetch/${surname}`, {method: 'GET', cache: 'no-store',});

    if(!res.ok) {
        throw new Error('Failed to fetch data from API');
    }
    return res.json();
    }
    catch(error) {
        console.error("Fetch error: ", error);
        return[];
    }
}

export async function deleteStudent(student_id: number) {
    try {
    const res = await fetch(`http://localhost:5073/api/values/DeleteValue/${student_id}`, {method: 'DELETE', cache: 'no-store',});
   if(!res.ok) {
    throw new Error('Failed to update data from API');
    }
    return res.ok;
    }
    catch(error) {
        console.error("Fetch error: ", error);
        return[];
    }
    }

export async function updateStudent(formData: FormData) {

    const providedAge = Number(formData.get("Age"));
    const providedBirthday = formData.get("Birthday")
    const birthdayDate = new Date(providedBirthday);
    const calculatedAge = calculateAge(birthdayDate);
    if (providedAge !== calculatedAge) {
        throw new Error(
      `Data Mismatch: The provided age is ${providedAge}, but the birthday ${providedBirthday} calculates to an age of ${calculatedAge}.`
    );
    }


    const studentData = {
    Id: Number(formData.get("ID")),
    Surname: formData.get("Surname"),
    FirstName: formData.get("Firstname"), 
    MiddleName: formData.get("Middlename"), 
    Age: Number(formData.get("Age")),
    Birthday: formData.get("Birthday"),
    ContactNumber: formData.get("Contactnumber"), 
    Email: formData.get("Email"),
    Remarks: formData.get("Remarks")
  };
    

    try {
    const res = await fetch(`http://localhost:5073/api/values/Updatevalue`, {method: 'PUT', cache: 'no-store', headers: {"Content-Type": "application/json",},body: JSON.stringify(studentData),});
    console.log(res);
    if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create student');
    }
    return true;
    }
    catch(error) {
        console.error("Fetch error: ", error);
         throw new Error(error);
    } 
}

export async function createStudent(formData: FormData) {
    const studentData = {
        Surname: formData.get("Surname"),
        FirstName: formData.get("Firstname"),
        MiddleName: formData.get("Middlename"), 
        Age: Number(formData.get("Age")),
        Birthday: formData.get("Birthday"),
        ContactNumber: formData.get("Contactnumber"), 
        Email: formData.get("Email"),
        Remarks: formData.get("Remarks")
    }

      const providedAge = Number(formData.get("Age"));
  const providedBirthday = formData.get("Birthday")
    const birthdayDate = new Date(providedBirthday);
    const calculatedAge = calculateAge(birthdayDate);
    if (providedAge !== calculatedAge) {
        throw new Error(
      `Data Mismatch: The provided age is ${providedAge}, but the birthday ${providedBirthday} calculates to an age of ${calculatedAge}.`
    );
    }

    try {
        console.log(studentData);
        const res = await fetch(`http://localhost:5073/api/values/InsertValue`,{method: 'POST', cache: 'no-store', headers: {"Content-Type": "application/json",}, body: JSON.stringify(studentData),});
        console.log(res);
        if(res.ok) {
            console.log('Student created successfully');
            return {success: true};
        } else if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create student');
        } 
        else {
            const errorData = await res.json(); 
  
            console.error('SERVER VALIDATION FAILED. DETAILS:', errorData);
            console.error('Failed to create student');
            throw new Error(errorData);

        }
    } catch (error) {
        console.error('An error occurred: ', error);
        throw new Error(error);
    }
}