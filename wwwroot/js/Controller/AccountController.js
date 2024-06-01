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
            console.log(JSON.stringify(response))
            if (parseInt(response.loginStatus) == 1) {
                //alert(response.msg)
                localStorage.setItem("UserName", pUserName);
                
                var pdata = response.data;
                console.log(pdata.pageURL)
                window.location.href = 'http://localhost:12666/' + pdata.pageURL;
            }
            else {
                alert("Unauthorized")
            }
        }); 
    } 
}