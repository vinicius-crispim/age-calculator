var inputDay = document.querySelector("#inputDay");
var inputMonth = document.querySelector("#inputMonth");
var inputYear = document.querySelector("#inputYear");
var btnSubmit = document.querySelector("#btnsubmit");
var currentDate = new Date;
var myModal = new bootstrap.Modal(erroModal);
var dataConv = new Date;

function getAge(dateString) {

    var yearNow = currentDate.getYear();
    var monthNow = currentDate.getMonth();
    var dateNow = currentDate.getDate();

    // Converte a string passada
    var dateSplit = dateString.split("/")

    var convertedDate = new Date(dateSplit[2],
        dateSplit[1] - 1,
        dateSplit[0]
    );

    var yearConverted = convertedDate.getYear();
    var monthConverted = convertedDate.getMonth();
    var dateConverted = convertedDate.getDate();

    // Diferença de anos
    yearAge = yearNow - yearConverted;

    // Diferença de meses
    if (monthNow >= monthConverted)
        var monthAge = monthNow - monthConverted;
    else {
        // Caso seja menos de 1 ano porém no ano interior, subtrai 1 ano, soma 12 mais o mes atual e
        // subtrai pelo mes informado
        // Ex: Hoje é dia 08/07/2023, caso o valor passado seja 08/10/2022,
        // diminui 1 ano, soma 12 + 7 (o mês atual) e subtrai pelo mês passado, no caso 10
        // 12 + 7 = 19 ||| 19 - 10 = 9 meses!
        yearAge--;
        var monthAge = 12 + monthNow - monthConverted;
    }

    // Diferença de dias
    if (dateNow >= dateConverted)
        var dateAge = dateNow - dateConverted;
    else {
        // Aqui é a mesma lógica que de ano e mês, porém para mês e dia, 
        // Ex: Hoje é dia 08/07/2023, caso o valor passado seja 12/06/2023,
        // diminui 1 mês, soma 31 + 8 (dia atual) e subtrai pelo dia passado, no caso 12
        // 31 + 8 = 39 ||| 39 - 12 = 27 dias! 
        monthAge--;
        var dateAge = 31 + dateNow - dateConverted;

        // Se após a subtração de 1 mês, ele ficar negativo, mês recebe 11 e subtrai 1 ano
        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    // Passa os valores
    document.querySelector(".day").textContent = dateAge;
    document.querySelector(".month").textContent = monthAge;
    document.querySelector(".year").textContent = yearAge;
}


btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    let erroMsg = inputValidate();
    if (erroMsg != "") {
        document.querySelector(".erroMsg").textContent = erroMsg;
    } else {
        getAge(dataConv[0] + "/" + dataConv[1] + "/" + dataConv[2])
    }
})

function inputValidate() {
    if (inputDay.value != "" && inputMonth.value != "" && inputYear.value != "") {
        if(inputDay.value > 0 && inputMonth.value > 0 && inputYear.value > 0){
            if (validDate(inputDay.value, inputMonth.value, inputYear.value)) {
                return "";
            } else {
                myModal = showModal();
                return "Não podem ser informadas datas futuras ou a data atual.";
            }
        } else {
            myModal = showModal();
            return "Os valores inseridos não podem ser menores ou igual a 0"
        }
    } else {
        myModal = showModal();
        return "Todos os campos devem ser preenchidos.";
    }

}


function validDate(inputDay, inputMonth, inputYear) {
    var re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/;
    let dataInformada = inputDay + "/" + inputMonth + "/" + inputYear;
    if (re.test(dataInformada)) {
        dataConv = dataInformada.split("/");
        if (new Date(dataConv[1] + "/" + dataConv[0] + "/" + dataConv[2]) < new Date((currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear())) {
            return true;
        };
    };

}

function showModal() {
    var erroModal = document.getElementById('erroModal');
    var myModal = new bootstrap.Modal(erroModal);
    myModal.show();
    return myModal;
}