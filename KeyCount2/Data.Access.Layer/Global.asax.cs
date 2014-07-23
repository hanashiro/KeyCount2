using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace Data.Access.Layer
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            DbConfiguration.SetConfiguration(new MySql.Data.Entity.MySqlEFConfiguration());
        }
    }
}