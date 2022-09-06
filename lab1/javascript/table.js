let get_X;
let get_Y;
let get_R;
let first = true;
function onSubmit() {
    if (validateForm()) {
        let xChbButtons = document.getElementsByName("x_value");
        for (let xChbButton of xChbButtons) {
            if (xChbButton.checked) {
                get_X = xChbButton.value;
                break;
            }
        }

        let rChbButtons = document.getElementsByName("r_value");
        for (let rChbButton of rChbButtons) {
            if (rChbButton.checked) {
                get_R = rChbButton.value;
                break;
            }
        }
        get_Y = document.getElementById("y_value").value.replace(/,/, '.');

        $.get("./server/work.php", {x : get_X, y: get_Y, r: get_R}, function (data) {
            let array = data.split("#");
            if (array[0] ==="err"){
                alert("Не надо так делать")
            }
            else{
                addRow(array[0], array[1], array[2], array[3], array[4], array[5]);
            }

        });

    }
}

function validateX() {
    if ($('.x-checkbox').is(':checked')) {
        $('.x_box_label').removeClass('box-error');
        return true;
    }
    else {
        $('.x_box_label').addClass('box-error');
        return false;
    }
}

function validateR() {
    if ($('.r-checkbox').is(':checked')) {
        $('.r_box_label').removeClass('box-error');
        return true;
    }
    else {
        $('.r_box_label').addClass('box-error');
        return false;
    }
}


function validateY(){
    let yField = $('#y_value');
    let numY = yField.val().replace(',', '.');
    if ((numY === "") || (isNaN(Number(numY))) || (numY > 5 || numY < -5))
        {
        yField.addClass('text-error');
        return false;
    } else {
        yField.removeClass('text-error');
        return true;
    }
}

function validateForm() {
    return validateX() & validateY() & validateR();
}

function addRow(cur_time, comp_time, x, y, r, result){
    let tbody = document.getElementsByClassName("table")[0].getElementsByTagName('TBODY')[0];
    let row = document.createElement("TR");
    tbody.append(row);

    if (first) {
        first = false;
        document.getElementById("no_result").remove();
    }

    let th1 = document.createElement("TD");
    let th2 = document.createElement("TD");
    let th3 = document.createElement("TD");
    let th4 = document.createElement("TD");
    let th5 = document.createElement("TD");
    let th6 = document.createElement("TD");

    row.appendChild(th1);
    row.appendChild(th2);
    row.appendChild(th3);
    row.appendChild(th4);
    row.appendChild(th5);
    row.appendChild(th6);


    th1.innerHTML = cur_time;
    th2.innerHTML = comp_time;
    th3.innerHTML = x;
    th4.innerHTML = y;
    th5.innerHTML = r;
    th6.innerHTML = result;
    if (result === "Не попадает") {
        row.className = "notGetIn";
    }
    else {
        row.className = "getIn";
    }
}

function clearHistory(){
    if (!first) {
        $.get("./server/reset.php");
        first = true;
        let tbody = document.getElementsByClassName("table")[0].getElementsByTagName('TBODY')[0];
        tbody.innerHTML = '<tr id="no_result"><th colspan="6">Нет результатов</th></tr>';

    }
}
