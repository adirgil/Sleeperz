using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Reflection;
using SleeperzDal.entities;
using System.Data;

namespace SleeperzDal
{
    public static class UsersDal
    {
        static string StConn = null;
        static SqlConnection con = null;
        static SqlCommand comm = null;

        static UsersDal()
        {
            Configuration config = null;
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);

            string exeConfigPath = path;
            try
            {
                config = ConfigurationManager.OpenExeConfiguration(exeConfigPath);
            }
            catch (Exception ex)
            {
                //handle errror here.. means DLL has no sattelite configuration file.
            }

            if (config != null)
            {
                StConn = GetAppSetting(config, "LiveDNS");
            }
            con = new SqlConnection(StConn);
            comm = new SqlCommand();
            comm.Connection = con;
        }

        static string GetAppSetting(Configuration config, string key)
        {
            KeyValueConfigurationElement element = config.AppSettings.Settings[key];
            if (element != null)
            {
                string value = element.Value;
                if (!string.IsNullOrEmpty(value))
                    return value;
            }
            return string.Empty;
        }

        private static void closeConnection()
        {
            if (comm.Connection.State == ConnectionState.Open)
            {
                comm.Connection.Close();
            }
        }

        public static UsersDB UserLogin(string userName, string password)
        {
            UsersDB p = null;
            try
            {
                comm.CommandText = "SELECT * " + " " +
                                                 " FROM Users " + "" +
                                                $" WHERE userName='{userName}' AND password='{password}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    p = new UsersDB()
                    {
                        ID = int.Parse(reader["ID"].ToString()),
                        userName = reader["userName"].ToString(),
                        password = (string)reader["password"],
                        score = int.Parse(reader["score"].ToString()),
                        highScore = int.Parse(reader["highScore"].ToString())
                    };
                }
            }
            finally
            {
                closeConnection();
            }

            return p;
        }


        public static int InsertUser(string userName, string pass)
        {
            int res = 0;
            try
            {
                comm.CommandText = "SELECT * FROM Users" +
                                                $" WHERE userName='{userName}'";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (!reader.Read())
                {
                    closeConnection();
                    comm.CommandText = " INSERT INTO Users (userName, password, score, highScore) " +
                                                $" VALUES ('{userName}' ,'{pass}' ,'{0}' ,'{0}')";
                    comm.Connection.Open();
                    res = comm.ExecuteNonQuery();
                }

            }
            finally
            {
                closeConnection();
            }

            return res;
        }

        public static int InsertUserWithFB(string userName)
        {
            int res = 0;
            try
            {
                comm.CommandText = "SELECT * FROM Users" +
                                                $" WHERE userName='{userName}'";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (!reader.Read())
                {
                    closeConnection();
                    comm.CommandText = " INSERT INTO Users (userName, score, highScore) " +
                                                    $" VALUES ('{userName}','{0}' ,'{0}')";
                    comm.Connection.Open();
                    res = comm.ExecuteNonQuery();
                }


            }
            finally
            {
                closeConnection();
            }

            return res;
        }

        public static List<UsersDB> UsersList()
        {
            List<UsersDB> p = new List<UsersDB>(); ;

            try
            {
                comm.CommandText = " SELECT * FROM Users";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                while (reader.Read())
                {
                    p.Add(new UsersDB()
                    {
                        ID = int.Parse(reader["ID"].ToString()),
                        userName = reader["userName"].ToString(),
                        password = (string)reader["password"],
                        score = int.Parse(reader["score"].ToString()),
                        highScore = int.Parse(reader["highScore"].ToString())
                    });
                }
            }
            finally
            {
                closeConnection();
            }
            return p;
        }

        public static UsersDB SelectByID(int ID)
        {
            UsersDB p = null;
            try
            {
                comm.CommandText = "SELECT * FROM Users" +
                                                $" WHERE ID='{ID}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    p = new UsersDB()
                    {
                        ID = int.Parse(reader["ID"].ToString()),
                        userName = reader["userName"].ToString(),
                        password = (string)reader["password"],
                        score = int.Parse(reader["score"].ToString()),
                        highScore = int.Parse(reader["highScore"].ToString())
                    };
                }
            }
            finally
            {
                closeConnection();
            }
            return p;
        }

        public static UsersDB SelectByUserName(string userName)
        {
            UsersDB p = null;
            try
            {
                comm.CommandText = "SELECT * FROM Users" +
                                                $" WHERE userName='{userName}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    p = new UsersDB()
                    {
                        ID = int.Parse(reader["ID"].ToString()),
                        userName = reader["userName"].ToString(),
                        //password = (string)reader["password"].ToString,
                        score = int.Parse(reader["score"].ToString()),
                        highScore = int.Parse(reader["highScore"].ToString())
                    };
                }
            }
            finally
            {
                closeConnection();
            }
            return p;
        }


        public static int UpdateUser(int ID, int score)
        {
            int res = 0;
            try
            {
                comm.CommandText = "SELECT * FROM Users" +
                                               $" WHERE ID='{ID}' ";

                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();

                //int a = score + int.Parse(reader["score"].ToString());

                if (reader.Read() && score > (int)reader["highScore"])
                {
                    closeConnection();
                    comm.CommandText = "UPDATE Users " +
                 $" SET score='{score}',highScore='{score}'" +
                 $" WHERE ID='{ID}'";

                    comm.Connection.Open();
                    res = comm.ExecuteNonQuery();
                }
                else
                {
                   
                    closeConnection();
                    comm.CommandText = "UPDATE Users " +
                 $" SET score='{score}'" +
                 $" WHERE ID='{ID}'";

                    comm.Connection.Open();
                    res = comm.ExecuteNonQuery();
                }

            }
            finally
            {
                closeConnection();
            }
            return res;

        }

    }
}
