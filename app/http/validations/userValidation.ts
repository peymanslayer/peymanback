import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { IUser } from "../../models/interfaces/user";

export const signupValidation=(user:IUser)=>{
  const schemaValidation=Joi.object({
    name:Joi.string().required().messages({"message":"خطایی در فیلد نام هست"}),
    lastName:Joi.string().required().messages({"message":"خطایی در فیلد نام خانوادگی هست"}),
    email:Joi.string().email().required().messages({"message":"ایمیل نامعتبر است"}),
    password:Joi.string().required().messages({"message":"رمز عبور نامعتبر است"}),
    phone:Joi.number().required().messages({"message":"شماره نامعتبر است"}),

})
   return schemaValidation.validate(user)
}

export const loginValidation=(user:IUser)=>{
   const schemaValidation=Joi.object({
    email:Joi.string().messages({"message":"اطلاعات وارد شده نادرست است"}).email().
      messages({"message":"ایمیل نادرست است"}).required().
      messages({"message":"ایمیل نباید خالی باشد"})
      ,
   
    password:Joi.string().messages({"message":"پسورد باید حرف باشد"}).required().
      messages({"message":"پسورد نباید خالی باشد"})
   }) 

   return schemaValidation.validate(user)

}