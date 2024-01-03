// characters
const lowercaseChar = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numericChar = '0123456789';
const specialChar = '!@#$%^&*()_+[]{}|;:,.<>?';
// 
const displayOutput=document.querySelector("#displayOutput");
const generateBtn=document.querySelector("#generate");
const clipboard=document.querySelector("#clipboard");
const rangeLiveData=document.querySelector("#rangeLiveData");
const passwordLength=document.querySelector("#passwordLength");
const uppercaseCheckBox=document.querySelector("#uppercaseCheckBox");
const lowercaseCheckBox=document.querySelector("#lowercaseCheckBox");
const numberCheckBox=document.querySelector("#numberCheckBox");
const symbolCheckBox=document.querySelector("#symbolCheckBox");

// toast 
const warningMsg='You must select at least one character set for the password. 🥲🥲'
const successMsg="Password Generated Successfully 😁😁👍"
const copyPasswordMsg="copied ✅👍😁"
// show  password length
rangeLiveData.textContent = passwordLength.value;
passwordLength.addEventListener("input", (event) => {
  rangeLiveData.textContent = event.target.value;
});
// generate password
generateBtn.addEventListener("click", () => {
    const length = passwordLength.value;
    const lower = lowercaseCheckBox.checked;
    const upper = uppercaseCheckBox.checked;
    const number = numberCheckBox.checked;
    const symbol = symbolCheckBox.checked;
    const password = generateRandomPassword(length, lower, upper, number, symbol);
    if(!lower && !upper && !number && !symbol){
        displayOutput.innerHTML="select at least one character set ";
        displayOutput.classList.remove("bg-[#313947]");
        displayOutput.classList.add("bg-red-500")
        showToast(warningMsg,'bg-red-500');
    }else{
        displayOutput.innerText =  password
        displayOutput.classList.add("bg-[#313947]");
        displayOutput.classList.remove("bg-red-500");
        showToast(successMsg,'bg-green-500');
    }
  });
// generate password in random order
function getRandomChar(result) {
    const randomIndex = Math.floor(Math.random() * result.length);
    return result.charAt(randomIndex)
}
// generate random password
function generateRandomPassword(length, lowercase, uppercase, numbers, symbol){
    let result="";
    if(lowercase){
        result+=lowercaseChar
    }
    if(uppercase){
        result+=uppercaseChar
    }
    if(numbers){
        result+=numericChar
    }
    if(symbol){
        result+=specialChar
    }
    let password = '';
    for (let i=0;i<length;i++){
        const randomChar = getRandomChar(result);
        password += randomChar;
    }
    return password
}
// toast message
const showToast = (msg,color) =>{
    let main_toast_container=document.createElement("div")
    main_toast_container.className=`w-[300px] ${color} absolute top-4 left-1 right-1 mx-auto rounded-md overflow-hidden`
    main_toast_container.innerHTML=`<div class="toast">
    <h6 class="text-white p-4"> ${msg}</h6>
    </div>`
    document.querySelector("body").appendChild(main_toast_container)
    setTimeout(()=>{
        main_toast_container.remove()
    },1500);
}
// copy

clipboard.addEventListener("click",()=>{
    if(!displayOutput.innerHTML.includes("")){
       return;
    }
    else{
        showToast(copyPasswordMsg,'bg-blue-500');
        navigator.clipboard.writeText(displayOutput.textContent);
    }
})


