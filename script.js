const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelector("input");
const userNickName = document.getElementById("nickname")
const userEmail = document.getElementById("email")
const userPassword = document.getElementById("userPassword")
const confirmPassword = document.getElementById("confirmPassword")
const userPhone = document.getElementById("phone")
const registrationForm = document.getElementById("registrationForm")

const updateHelperText = (input,message,isValid)=>{
  const inputGroup=input.parentElement;
  const helperText=inputGroup.getElementsByClassName("helperText")[0];
  if(isValid==true){
    inputGroup.classList.remove("invalid");
    inputGroup.classList.add("valid");
    helperText.style.visibility='hidden'
  }
  if(isValid==false){
    inputGroup.classList.remove("valid");
    inputGroup.classList.add("invalid");
    helperText.style.visibility='visible';
    helperText.innerText=message;
  }
}

// 입력필드 비어있는지 확인
const checkEmptyInput=(input)=>{
  if(input.value.trim()===''){
    updateHelperText(input,"값을 입력해주세요.",false)
  }else{
    updateHelperText(input,"",true)
  }
}

// 이메일 주소 확인
const validateEmailFormat=(input)=>{
  const emailPattern=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  if(emailPattern.test(input.value.trim())==true){
    updateHelperText(input,"",true);
    return true;
  }else{
    updateHelperText(input,"유효한 이메일 주소 입력 부탁드립니다.",false);
  }
}