function reloadTable() {
    fetch('http://localhost:8080/rest/admin/').then(
        response => {
            response.json().then(
                data => {
                    let temp ="";
                    data.forEach((u) => {
                        temp += "<tr >";
                        temp += "<td >"+ u.id + "</td>";
                        temp += "<td >"+ u.name + "</td>";
                        temp += "<td >"+ u.lastName + "</td>";
                        temp += "<td >"+ u.email + "</td>";
                        temp += "<td >"+ u.password + "</td>";
                        temp += "<td >"+ u.age + "</td>";
                        temp += "<td >"+ u.roles + "</td>";
                        temp += "<td >" +
                            "    <a class='btn btn-info' role='button' onmouseover='fillEditModal(" + u.id + ")' data-toggle='modal' data-target='#editUser'>Edit</a>" +
                            "    </td>"
                        temp += "<td >" +
                            "    <a class='btn btn-danger' role='button' onmouseover='fillDeleteModal(" + u.id + ")' data-toggle='modal' data-target='#deleteUser'>Delete</a>" +
                            "    </td>"
                        temp += "</tr>";
                    })
                    $("#usersTableHere").empty();
                    $("#usersTableHere").append(temp);
                }
            )
        }
    )
}
function fillEditModal(userId) {
    $.get("http://localhost:8080/rest/admin/" + userId, function (userJSON) {
        $('#idToEditUser').val(userJSON.id);
        $('#nameToEditUser').val(userJSON.name);
        $('#lastNameToEditUser').val(userJSON.lastName);
        $('#ageToEditUser').val(userJSON.age);
        $('#emailToEditUser').val(userJSON.email);
        $('#passwordToEditUser').val(userJSON.password);
        if(userJSON.roles.length==2){
            $("#ROLE_USER").prop('checked', true);
            $("#ROLE_ADMIN").prop('checked', true);
        } else if (userJSON.roles.length==1){
            $("#ROLE_USER").prop('checked', true);
            $("#ROLE_ADMIN").prop('checked', false);
        } else {
            $("#ROLE_USER").prop('checked', false);
            $("#ROLE_ADMIN").prop('checked', false);
        }
    });
}
function fillDeleteModal(userId) {
    $.get("http://localhost:8080/rest/admin/" + userId, function (userJSON) {
        $('#idToDeleteUser').val(userJSON.id);
        $('#nameToDeleteUser').val(userJSON.name);
        $('#lastNameToDeleteUser').val(userJSON.lastName);
        $('#ageToDeleteUser').val(userJSON.age);
        $('#emailToDeleteUser').val(userJSON.email);
        if(userJSON.roles.length==2){
            $("#Delete_ROLE_USER").prop('checked', true);
            $("#Delete_ROLE_ADMIN").prop('checked', true);
        } else if (userJSON.roles.length==1){
            $("#Delete_ROLE_USER").prop('checked', true);
            $("#Delete_ROLE_ADMIN").prop('checked', false);
        } else {
            $("#Delete_ROLE_USER").prop('checked', false);
            $("#Delete_ROLE_ADMIN").prop('checked', false);
        }
    });
}
function reloadNewUserTable(){
    $('#newName').val('');
    $('#newLastName').val('');
    $('#newAge').val('');
    $('#newEmail').val('');
    $('#newPassword').val('');
    $("#New_ROLE_USER").prop('checked', false);
    $("#New_ROLE_ADMIN").prop('checked', false);
}


$(function () {
    $("#logout").append("<a class='custom-a' href='/logout'>Logout</a>");
    $('#addSubmit').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });

        let user = {
            name : $("#newName").val(),
            lastName : $("#newLastName").val(),
            age : $("#newAge").val(),
            email : $("#newEmail").val(),
            password : $("#newPassword").val(),
            roles : checked
        };
        fetch('http://localhost:8080/rest/admin/', {
            method: "POST",
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
        reloadTable();
        alert("Новый юзер добавлен")
        reloadNewUserTable();
        reloadTable()
    });
    $('#modalDeleteBtn').on("click", function () {
        fetch('http://localhost:8080/rest/admin/'+ $('#idToDeleteUser').val(), {
            method: "DELETE",
            credentials: 'same-origin',
        });
        reloadTable();
        alert("Удален")
        reloadTable();
    });
    $('#modalEditBtn').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });

        let user = {
            id : $('#idToEditUser').val(),
            name : $("#nameToEditUser").val(),
            lastName : $("#lastNameToEditUser").val(),
            age : $("#ageToEditUser").val(),
            email : $("#emailToEditUser").val(),
            password : $("#passwordToEditUser").val(),
            roles : checked
        };
        fetch('http://localhost:8080/rest/admin/', {
            method: "PUT",
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
        reloadTable();
        alert("Отредактирован")
        reloadTable();
        reloadNewUserTable();
    });
});
reloadTable();