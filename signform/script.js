const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelector("input");
const userNickName = document.getElementById("nickname")
const userEmail = document.getElementById("userEmail")
const userPassword = document.getElementById("userPassword")
const confirmPassword = document.getElementById("confirmPassword")
const userPhone = document.getElementById("phone")
const registrationForm = document.getElementById("registrationForm")

// input태그의 부모태그에 접근해서 helperText에 접근
// 매개변수의 input에 모든 태그가 들어갈 수 있음
// 알림 설정해주는 코드
// 만약 isValid에 false가 들어오면 inputGroup.classList에 invalid가 들어옴.
// 그러면 CSS 파일의 .inputGroup.invalid .helperText 가 적용되어 input태그가 빨간색이 적용됨
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

// 모든 필드에 대해 입력필드 비어있는지 확인
// input 입력란에 띄어쓰기를 없애는 기능이 trim
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
  const strongPattern=/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if(strongPattern.test(password.value)==true){
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

// 등록완료 클릭 시 입력필드 유효한지 확인
const validateForm=()=>{
  const isNicknameValid=checkEmptyInput(userNickName);
  const isEmailValid = validateEmailFormat(userEmail);
  const isPasswordStrong = checkPasswordStrength(userPassword);
  const isPasswordMatch = validatePasswordMatch(userPassword,confirmPassword);
  const isPhoneValid = validatePhoneNumber(userPhone);
  return isNicknameValid&&isEmailValid&&isPasswordStrong&&isPasswordMatch&&isPhoneValid;
}

// submit 타입의 버튼이 HTML에 있는데 이게 눌러졌을때
// 버튼 눌렀을때 발생하는 기능들을 압축해서 key:value로 모아놓은것을 e라고함
// 기본적으로 폼태크에서 submit 버튼 누르면 새로고침되서 데이터가 없어지는데, 
// e.preventDefault는 이를 방지하는 역할
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
// querySelectorAll안에 많은 input태그가 배열로 있는데,
// forEach는 배열 안에 input 태그를 각각 뽑아올때 사용
document.querySelectorAll("input").forEach(input=>{
  input.addEventListener("input",()=>{
    switch(input.id){
      case 'nickname':
        checkEmptyInput(input);
        break;
      case 'userEmail':
        validateEmailFormat(input);
        break;
      case 'userPassword':
        checkPasswordStrength(userPassword);
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