using SleeperzDal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace SleeperzBal
{
    public static class UsersBal
    {
        public static string UserLogin(string userName, string pass)
        {
            return new JavaScriptSerializer().Serialize(UsersDal.UserLogin(userName, pass));

        }

        public static string InsertUser(string userName, string pass)
        {
            return new JavaScriptSerializer().Serialize(UsersDal.InsertUser(userName, pass));

        }

        public static string InsertUserWithFB(string userName)
        {
            return new JavaScriptSerializer().Serialize(UsersDal.InsertUserWithFB(userName));

        }

        public static string UsersList()
        {
            return new JavaScriptSerializer().Serialize(UsersDal.UsersList());
        }

        public static string SelectByID(int ID)
        {
            return new JavaScriptSerializer().Serialize(UsersDal.SelectByID(ID));
        }

        public static string SelectByUserName(string userName)
        {
            return new JavaScriptSerializer().Serialize(UsersDal.SelectByUserName(userName));
        }

        public static string UpdateUser(int ID, int score)
        {
            return new JavaScriptSerializer().Serialize(UsersDal.UpdateUser(ID, score));
        }
    }
}
