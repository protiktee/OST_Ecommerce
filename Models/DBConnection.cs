﻿namespace OST_Ecommerce.Models
{
	public class DBConnection
	{

		public static IConfiguration Configuration { get; set; }
		public static string GetDBConstring()
		{
			string strConnection = "";
			var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
			Configuration = builder.Build();
			strConnection = Configuration["ConnString"].ToString();
			return strConnection;
			//return Configuration["ConnString"].ToString();
		}

	}
}
