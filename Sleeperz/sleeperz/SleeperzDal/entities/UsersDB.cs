using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SleeperzDal.entities
{
    public class UsersDB
    {
        public int ID { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public int score { get; set; }
        public int highScore { get; set; }
    }
}
