using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApartmentsCore;

namespace WebProject.Controllers
{
    public class MyApartmentsController : ApiController
    {

        [HttpGet, Route("api/myapartments")]
        public IEnumerable<Apartment> Get(string username)
        {
            var s = new ApartmentService();
            var m = new List<Apartment>();
            if (String.IsNullOrEmpty(username))
            {
                //if not found return empty list
                return m;
            }
            s.LoadMyApartments(m, username);
            return m;
        }
    }
}
