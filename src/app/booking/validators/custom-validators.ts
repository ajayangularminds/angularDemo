import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidators {

    static validateName(control: AbstractControl) {
        const value = control.value as string;
        if(value.includes('test')){
            return {
                invalidName: true,
            }
        }
        return null;
    }

    static validateSpecialCharacter(char:string){
        return (control: AbstractControl)=>{

            const value = control.value as string;
            if(value.includes(char)){
                return {
                    invalidSpecialCharacter: true,
                };
            }
            return null;
        };
    }

    static validateDate(control:FormGroup){
        const checkinDate:any = new Date(control.get('checkinDate')?.value);
        const checkoutDate:any = new Date(control.get('checkoutDate')?.value) ;

        const diffTime = checkoutDate-checkinDate;

        const diffDays = Math.ceil( diffTime/ (1000*60*60*24))
        console.log(diffTime)
        if(diffDays <= 0){
            control.get('checkoutDate')?.setErrors({
                invalidDate: true
            })
            return {
                invalidDate : true,
            }
        }
        return null;
    }
}
