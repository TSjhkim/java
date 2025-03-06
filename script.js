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
    updateHelperText(input,"값을 입력해주세요.",false);
    return false;
  }else{
    updateHelperText(input,"",true)
    return true;
  }
}

// 이메일 주소 확인
const validateEmailFormat=(input)=>{
  const emailPattern=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if(emailPattern.test(input.value.trim())==true){
    updateHelperText(input,"",true);
    return true;
  }else{
    updateHelperText(input,"유효한 이메일 주소 입력 부탁드립니다.",false);
    return false;
  }
}

// 비밀번호 강도
const checkPasswordStrength = (password)=>{
  const strongPattern=/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
  if(strongPattern.text(password.value)==true){
    updateHelperText(password,"비밀번호 강도:강함",true);
    return true;
  }else{
    updateHelperText(password,"비밀번호는 8자 이상이며 복잡하게 만들어야합니다.",false);
    return false;
  }
}

// 비밀번호 일치여부 확인
const validatePasswordMatch=(passwordInput,confirmInput)=>{
  if(passwordInput.value !== confirmInput.value){
    updateHelperText(confirmInput,"비밀번호가 일치하지 않습니다.",false);
    return false;
  }else{
    updateHelperText(confirmInput,"",true);
    return true;
  }
}

// 전화번호 올바른지 확인
const validatePhoneNumber = (input)=>{
  const phonePattern=/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  if(phonePattern.test(input.value.trim())==true){
    updateHelperText(input,"",true);
    return true;
  }else{
    updateHelperText(input,"유효한 전화번호를 입력해주세요.",false);
    return false;
  }
}

// 폼제출 시 입력필드 유효한지 확인
const validateForm=()=>{
  const isNicknameValid=checkEmptyInput(userNickName);
  const isEmailValid = validateEmailFormat(userEmail);
  const isPasswordStrong = checkPasswordStrength(userPassword);
  const isPasswordMatch = validatePasswordMatch(userPassword,confirmPassword);
  const isPhoneValid = validatePhoneNumber(userPhone);
  return isNicknameValid&&isEmailValid&&isPasswordStrong&&isPasswordMatch&&isPhoneValid;
}

registrationForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(validateForm()==true){
    console.log("사용이 가능합니다.")
  }else{
    console.log("위 필드 중 일부분이 에러가 발생합니다.")
  }
  console.log(e);
});

// 각 인풋태그마다 테두리로 알림
document.querySelectorAll("input").forEach(input=>{
  // forEach는 배열 안에 데이터를 각각 뽑아올때 사용
  input.addEventListener("input",()=>{
    switch(input.id){
      case 'nickname':
        checkEmptyInput(input);
        break;
      case 'email':
        validateEmailFormat(input);
        break;
      case 'userPassword':
        checkPasswordStrength(input);
        break;
      case 'confirmPassword':
        validatePasswordMatch(userPassword,confirmPassword);
        break;
      case 'phone':
        validatePhoneNumber(input);
        break;
    }
  })
})