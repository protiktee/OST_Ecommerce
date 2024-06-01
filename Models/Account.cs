using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;

namespace OST_Ecommerce.Models
{
    public class Account
    {
		[DataMember]
        public string UserName { get; set; }
        public string Password { get; set; }
        [DataMember]
        public string Role { get; set; }
        [DataMember]
        public string PageURL { get; set; }
        public static List<Account> ListUsers()
        {
			List<Account> LstUsers = new List<Account>();
			DataTable dataTable = new DataTable();
			string ConnString = DBConnection.GetDBConstring();
			//ApplciationName
			SqlConnection connection = new SqlConnection(ConnString);
			connection.Open();
			SqlCommand cmd = new SqlCommand();
			cmd.Connection = connection;
			cmd.CommandText = "dbo.spOst_LstMember";
			cmd.Parameters.Clear();
			//cmd.Parameters.Add(new SqlParameter("@UserName", this.UserName));
			//cmd.Parameters.Add(new SqlParameter("@Password", this.Password));
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;

			SqlDataAdapter adapter = new SqlDataAdapter(cmd);
			adapter.Fill(dataTable);
			cmd.Dispose();
			connection.Close();

			if (dataTable.Rows.Count > 0)
			{
				var pdata = (from p in dataTable.AsEnumerable()
							 //where p.Field<string>("Name") == this.UserName && p.Field<string>("Password") == this.Password
							 select new
							 {
								 UserName = p.Field<string>("Name"),
								 Role = p.Field<string>("Role"),
                                 Password = p.Field<string>("Password"),
                                 DashBoardPageURL = p.Field<string>("DashBoardPageURL")
                             }
						 ).ToList();
				foreach (var obj in pdata)
				{
					Account account = new Account();
					account.UserName = obj.UserName;
					account.Role = obj.Role;
					account.Password = obj.Password;
					account.PageURL = obj.DashBoardPageURL;

                    LstUsers.Add(account);
				} 
			}

			//if (pdata!=null)
			//{
			//    return true;
			//}
			return LstUsers;
		}
    }
}
