const inputSlider=document.querySelector("[data-length-slider]");
const lengthDisplay=document.querySelector("[data-length-number]");
const indicator=document.querySelector("[data-indiator]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copying]");
const numberCheck=document.querySelector("#number");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck=document.querySelector("#lowercase");
const symbolsCheck=document.querySelector("#symbols");
const generateBtn=document.querySelector("[gen-button]");
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
const passwordDisplay=document.querySelector("[data-password-display]");
const symbols="!@#$%^&*()_+}{:>?<}";



let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

//Set color strength

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//to give random number

function getRndInteger(min,max)
{
    return Math.floor(Math.random()*(max-min)) + min;
}

//get random integer


function generateRandomNumber()
{
    return getRndInteger(0,9);
}

//get random lowercase

function generateLowerCase()
{
    return String.fromCharCode(getRndInteger(97,123));
}

//get random uppercase

function generateUppercase()
{
    return String.fromCharCode(getRndInteger(65,91));
}
//set indicator
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}


//get random symbols

function generateSymbols(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

async function copyContent ()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";

    }
    catch(e)
    {
        copyMsg.innerText="Failed";

    }
    copyMsg.classList.add("active");   

    setTimeout(()=>{

    copyMsg.classList.remove("active");   


  },2000);
}

inputSlider.addEventListener('input',(e) => {
    passwordLength=e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',() => {// may be error   
    if(passwordDisplay.value)
    {
        copyContent();
    }
});

function handleCheckBoxChange() {
    checkCount=0;

    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked)
        {
            checkCount++;
        }
    });

    //special Condition

    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckbox.forEach((checkbox) => {

    checkbox.addEventListener('change',handleCheckBoxChange);



});


generateBtn.addEventListener('click', () => {
    //no of check box

    if(checkCount<=0)
    {
        return;
    }

    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }





    // for passs

    password="";

    // if(upperCaseCheck.checked)
// {
//     password+=generateUppercase();
// }
// if(lowerCaseCheck.checked)
// {
//     password+=generateLowerCase();
// }
// if(numberCheck.checked)
// {
//     password+=generateRandomNumber();
// }
// if(symbolsCheck.checked)
// {
//     password+=generateSymbols();
    // }

let funcArr=[];

    if(upperCaseCheck.checked)
{
    funcArr.push(generateUppercase);
   }
     if(lowerCaseCheck.checked)
   {
       funcArr.push(generateLowerCase);
   }

   if(numberCheck.checked)
   {
       funcArr.push(generateRandomNumber);
   }

    if(symbolsCheck.checked)
   {
      funcArr.push(generateSymbols);
   }

    for(let i=0;i<funcArr.length;i++)
  {
    password+=funcArr[i]();
   
   }


   //remaining 


    for(let i=0;i<passwordLength-funcArr.length;i++)
{
    let randindex=getRndInteger(0,funcArr.length);
    console.log(randindex);
    password += funcArr[randindex]();
}




    passwordDisplay.value=password;
    calcStrength();


});







