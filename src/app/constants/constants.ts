export const passwordPattern: RegExp = 
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$ %^&*()_+\-=\[\]{};':\\|,.<>\/?]).{8,16}/;

export const emailPattern: RegExp =
    /^\w+([.-]?\w+)*@docquity.com/;

export const loginsuccess:string = "Login Successful!";
export const loginfailure:string = "User could not be logged in, due to:";
export const registerfailure: string = "User could not be created, due to:";
export const registersuccess:string = "created successfully";