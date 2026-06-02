// let a: number = 10;

// a = 50;

// console.log(a)

// //Array
// let arr: number[] = [90, 80, 70, 60, 50];

// // arr.push("90"); //This will giv error: Argument of type 'string' is not assignable to parameter of type 'number'

// console.log(arr);


// //Tuples
// // A tuple is a special type of array that allows you to store values of different types in a specific order.
// let tup:[string, string, number, boolean] = ["John", "Doe", 30, true]; 

// console.log(tup);


// //enum

// enum Role {
//     ADMIN,
//     USER,
//     SUP_ADMIN
// }

// let user = Role.ADMIN;
// console.log(user); // Output: 0



// //any vs unknown vs never
// //any type is a type that can be any value. It is the most flexible type in TypeScript, but it also has the least type safety. It is generally not recommended to use any type, as it can lead to runtime errors.
// let a:any = "10";

// a = 80;

// a = true;

// console.log(a);


// union types
// A union type is a type that can be one of several types. It is defined using the | operator.
let a: number | string | null = 10;

a = "Hello";

console.log(a)