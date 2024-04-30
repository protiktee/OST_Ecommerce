var AccountController = {
    VerifyUser: (actionBtn,url) => {
        let pUserName = $('#txtUserName').val();
        let pPassword = $('#txtPassword').val(); 

        var ModelAccount =
        {
            UserName: pUserName,
            Password: pPassword
        }
        AccountService.VerifyUser(ModelAccount, function (response) {
            debugger;
            if (response == "Successfully Authorized") {
                localStorage.setItem("UserName", pUserName);
                window.location.href = url;
            }
            else {
                alert("Unauthorized")
            }
        }); 
    } 
}