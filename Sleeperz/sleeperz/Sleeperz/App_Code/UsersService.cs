using SleeperzBal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for UsersService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]

public class UsersService : System.Web.Services.WebService
{

    public UsersService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string UserLogin(string userName, string pass)
    {
        return UsersBal.UserLogin(userName, pass);
    }

    [WebMethod]
    public string InsertUser(string userName, string pass)
    {
        return UsersBal.InsertUser(userName, pass);
    }

    [WebMethod]
    public string InsertUserWithFB(string userName)
    {
        return UsersBal.InsertUserWithFB(userName);
    }

    [WebMethod]
    public string UsersList()
    {
        return UsersBal.UsersList();
    }

    [WebMethod]
    public string SelectByID(int ID)
    {
        return UsersBal.SelectByID(ID);
    }

    [WebMethod]
    public string SelectByUserName(string userName)
    {
        return UsersBal.SelectByUserName(userName);
    }

    [WebMethod]
    public string UpdateUser(int ID, int score)
    {
        return UsersBal.UpdateUser(ID, score);
    }



}
