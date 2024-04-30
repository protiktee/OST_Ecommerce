var AccountService = {
    VerifyUser: (ModelAccount,callback) => {
        //$.get("http://localhost:12666/AccountAPI/VerifyUser?UserName=" + UserName + "&Password=" + Password, function (data, status) {
        //    //alert("Now I am in service,going to controller")
        //    callback(data);
        //});

        $.post(
            "http://localhost:12666/AccountAPI/VerifyUser",
            { "ModelAccount": ModelAccount },
            function (data, status) {
                callback(data);
            })
    }
}