module.exports = [
"[project]/Documents/GitHub/student_database_Frontend/app/components/students.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00607fca91f1152e9c0550188444ae071f94340028":"getStudents","402f54cc7dc24e575d3a2a7501b28ee5198db49b40":"updateStudent","40a55abba7beb59658fb5f98b60633541c075cb040":"deleteStudent","40c8cdf4aa4cd4390a0688c878d519ba6f4ae25781":"fetchStudent","40ce8a093eaa0349b485c0a1270c7b5dd774a1cca2":"createStudent","40d15f1d97262155e260da9ec613be126d90ee370f":"fetchStudentViaID"},"",""] */ __turbopack_context__.s([
    "createStudent",
    ()=>createStudent,
    "deleteStudent",
    ()=>deleteStudent,
    "fetchStudent",
    ()=>fetchStudent,
    "fetchStudentViaID",
    ()=>fetchStudentViaID,
    "getStudents",
    ()=>getStudents,
    "updateStudent",
    ()=>updateStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/student_database_Frontend/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/student_database_Frontend/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || monthDifference === 0 && today.getDate() < birthdate.getDate()) {
        age--;
    }
    return age;
}
async function getStudents() {
    try {
        const res = await fetch(`http://localhost:5073/api/values/GetAllValues`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data from API');
        }
        return res.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        return [];
    }
}
async function fetchStudent(surname1) {
    try {
        const res = await fetch(`http://localhost:5073/api/values/SingleFetch/${surname1}`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data from API');
        }
        return res.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        return [];
    }
}
async function fetchStudentViaID(ID) {
    try {
        const res = await fetch(`http://localhost:5073/api/values/SingleFetch/${surname}`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data from API');
        }
        return res.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        return [];
    }
}
async function deleteStudent(student_id) {
    try {
        const res = await fetch(`http://localhost:5073/api/values/DeleteValue/${student_id}`, {
            method: 'DELETE',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Failed to update data from API');
        }
        return res.ok;
    } catch (error) {
        console.error("Fetch error: ", error);
        return [];
    }
}
async function updateStudent(formData) {
    const providedAge = Number(formData.get("Age"));
    const providedBirthday = formData.get("Birthday");
    const birthdayDate = new Date(providedBirthday);
    const calculatedAge = calculateAge(birthdayDate);
    if (providedAge !== calculatedAge) {
        throw new Error(`Data Mismatch: The provided age is ${providedAge}, but the birthday ${providedBirthday} calculates to an age of ${calculatedAge}.`);
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
        const res = await fetch(`http://localhost:5073/api/values/Updatevalue`, {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });
        console.log(res);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create student');
        }
        return true;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw new Error(error);
    }
}
async function createStudent(formData) {
    const studentData = {
        Surname: formData.get("Surname"),
        FirstName: formData.get("Firstname"),
        MiddleName: formData.get("Middlename"),
        Age: Number(formData.get("Age")),
        Birthday: formData.get("Birthday"),
        ContactNumber: formData.get("Contactnumber"),
        Email: formData.get("Email"),
        Remarks: formData.get("Remarks")
    };
    const providedAge = Number(formData.get("Age"));
    const providedBirthday = formData.get("Birthday");
    const birthdayDate = new Date(providedBirthday);
    const calculatedAge = calculateAge(birthdayDate);
    if (providedAge !== calculatedAge) {
        throw new Error(`Data Mismatch: The provided age is ${providedAge}, but the birthday ${providedBirthday} calculates to an age of ${calculatedAge}.`);
    }
    try {
        console.log(studentData);
        const res = await fetch(`http://localhost:5073/api/values/InsertValue`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });
        console.log(res);
        if (res.ok) {
            console.log('Student created successfully');
            return {
                success: true
            };
        } else if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create student');
        } else {
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getStudents,
    fetchStudent,
    fetchStudentViaID,
    deleteStudent,
    updateStudent,
    createStudent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudents, "00607fca91f1152e9c0550188444ae071f94340028", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchStudent, "40c8cdf4aa4cd4390a0688c878d519ba6f4ae25781", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchStudentViaID, "40d15f1d97262155e260da9ec613be126d90ee370f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteStudent, "40a55abba7beb59658fb5f98b60633541c075cb040", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudent, "402f54cc7dc24e575d3a2a7501b28ee5198db49b40", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createStudent, "40ce8a093eaa0349b485c0a1270c7b5dd774a1cca2", null);
}),
"[project]/Documents/GitHub/student_database_Frontend/.next-internal/server/app/students/page/actions.js { ACTIONS_MODULE0 => \"[project]/Documents/GitHub/student_database_Frontend/app/components/students.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/student_database_Frontend/app/components/students.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/Documents/GitHub/student_database_Frontend/.next-internal/server/app/students/page/actions.js { ACTIONS_MODULE0 => \"[project]/Documents/GitHub/student_database_Frontend/app/components/students.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00607fca91f1152e9c0550188444ae071f94340028",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudents"],
    "402f54cc7dc24e575d3a2a7501b28ee5198db49b40",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateStudent"],
    "40a55abba7beb59658fb5f98b60633541c075cb040",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteStudent"],
    "40ce8a093eaa0349b485c0a1270c7b5dd774a1cca2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createStudent"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f2e$next$2d$internal$2f$server$2f$app$2f$students$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Documents/GitHub/student_database_Frontend/.next-internal/server/app/students/page/actions.js { ACTIONS_MODULE0 => "[project]/Documents/GitHub/student_database_Frontend/app/components/students.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$student_database_Frontend$2f$app$2f$components$2f$students$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/student_database_Frontend/app/components/students.ts [app-rsc] (ecmascript)");
}),
"[project]/Documents/GitHub/student_database_Frontend/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/Documents/GitHub/student_database_Frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/Documents/GitHub/student_database_Frontend/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=Documents_GitHub_student_database_Frontend_64496a8a._.js.map