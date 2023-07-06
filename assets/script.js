var inputDay = document.querySelector("#inputDay");
var inputMonth = document.querySelector("#inputMonth");
var inputYear = document.querySelector("#inputYear");
var btnSubmit = document.querySelector("#btnsubmit");
btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    var erroMsg = "";
    erroMsg = inputValidate();
})

function inputValidate() {
    if (inputDay.value != "" && inputMonth.value != "" && inputYear.value != "") {
        var showYear = document.querySelector(".year");
        var showMonth = document.querySelector(".month");
        var showDay = document.querySelector(".day");
        if(validDate(inputDay.value, inputMonth.value, inputYear.value)){
            showDay.textContent = inputDay.value;
            showMonth.textContent = inputMonth.value;
            showYear.textContent = inputYear.value;
            console.log("AQQ")
        }
    } else {
        var erroModal = document.getElementById('erroModal');
        var myModal = new bootstrap.Modal(erroModal);
        myModal.show();
        return ("Favor preencher todos os campooos");
    }
}

function validDate(inputDay, inputMonth, inputYear) {
    var re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    console.log(inputDay + "/" + inputMonth + "/" + inputYear);
    return re.test(inputDay + "/" + inputMonth + "/" + inputYear);
    
}