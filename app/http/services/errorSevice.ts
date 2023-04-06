
export class ErrorService{

    handlerRequired =():any=>{
        const message="اطلاعات وارد شده درست نیست";
        return {
          status:400,
          message:message
        }
    
      }

    handleCastErrorDB =():any => {
    const message = "مشکلی در سایت بوجود امده است";
    return {
      status:400,
      message:message
    }
  };
  

  handleValidationErrorDB =():any => {
    const message = "خطای اعتبار سنجی";
    return {
      status:400,
      message:message
    }
  };

  handleJWTError = ():any =>{
    return{
      status:401,
      message:'خطایی بوجود امده است'
    }
   }

   handleJWTExpiredError = ():any =>{
    return{
      status:401,
      message:'مدت زمان وارد شدن شما به پایان رسیده .دوباره وارد شوید'
    }
   }

   handleDuplicateFieldsDB = ():any => {
   
  
    const message = "اطلاعات وارد شده تکراریست";
    return {
      status:400,
      message:message
    }
  };
}