// DOM요소를 연결해줘야함. HTML태그와 JS요소 연결.
// 인풋 태그
const screen = document.getElementById("screen");
// querySelector()는 태그 하나만 가져옴
// querySelectorAll()는 태그 여러개를 리스트형으로 가져옴
const button = document.querySelectorAll("button");

// 연산자 구별 정규식 (구글링)
const operatorRegex = /[+\-*/]/;
// 숫자 구별 정규식 (구글링)
const numberRegex = /\d/;

// input태그 화면에 숫자 또는 연산자 추가하는 함수
// screen은 위에서 정의한 인풋태그에 적용되는 값
function appendToScreen(value){
    screen.value+=value;
}

// 화면 초기화 함수
function clearScreen(){
    screen.value="";
}

// 연산 수행 함수
function calculate(operator,numbers){
    // numbers에다가 배열로된 데이터를 넣을거임(숫자와 연산자)
    // numbers의 배열데이터를 숫자화하는게 map임
    // 숫자화된 값들이 각각 num1 과 num2 변수에 할당됨
    const [num1,num2] = numbers.map(Number);
    
    switch(operator){
        case "+":
            return num1+num2;
        case "-":
            return num1-num2;
        case "*":
            return num1*num2;
        case "/":
            // 삼항조건식
            // ? 앞에 조건식이 들어감. True면 첫번째가 실행되고 False면 두번째가 실행됨
            return num2!==0 ? num1/num2: "Error";
        default:
            return "";
    }

}

function handleButtonClick(event){
    // 새로고침이 방지됨
    event.preventDefault();
    const buttonText=event.target.innerText;
    
    if(numberRegex.test(buttonText)==true){
        appendToScreen(buttonText);
    }else if(operatorRegex.test(buttonText)==true){
        appendToScreen(buttonText);
    }
}

// 버튼 클릭 시 이벤트 리스너 등록 함수
function initializeButtonListener(){
    button.forEach((button)=>{
        button.addEventListener("click",handleButtonClick);
    })
}

// "=" 버튼 클릭 시 계산 결과 화면에 표시
function handleResultClick(){
    const screenValue = screen.value;
    if(screenValue.includes("+")){
        // + 를 기준으로 두 값을 쪼개주는 커맨드
        const [num1,num2]=screenValue.split("+");
        screen.value=calculate("+",[num1,num2]);
    }else if(screenValue.includes("-")){
        // + 를 기준으로 두 값을 쪼개주는 커맨드
        const [num1,num2]=screenValue.split("-");
        screen.value=calculate("-",[num1,num2]);
    }else if(screenValue.includes("*")){
        // + 를 기준으로 두 값을 쪼개주는 커맨드
        const [num1,num2]=screenValue.split("*");
        screen.value=calculate("*",[num1,num2]);
    }else if(screenValue.includes("/")){
        // + 를 기준으로 두 값을 쪼개주는 커맨드
        const [num1,num2]=screenValue.split("/");
        screen.value=calculate("/",[num1,num2]);
    }
}

// 초기화 버튼 클릭 시 화면 초기화
document.getElementById("resetButton").addEventListener("click",function(){
    clearScreen();
})

// "=" 버튼 클릭 시 계산 실행
document.getElementById("result").addEventListener("click",handleResultClick);

// 계산기 기능 실행시키기
initializeButtonListener();

console.log(screen);