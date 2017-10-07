using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApartmentsCore;
using System.Web.Http.Cors;

namespace WebProject.Controllers
{
  //  [EnableCorsAttribute("http://localhost:50743", "*", "*")
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        //Register
        // POST api/values

        //http://localhost:64014a/pi/authentication
        [HttpPost, Route("api/authentication")]
        public IHttpActionResult Post([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest("User can't be Null");
            }

            try
            {
                var s = new ApartmentService();
                s.RegisterUser(user);
            }
            catch (Exception e)
            {
                return Conflict();
            }

            // return Created<User>(Request.RequestUri + user.Id.ToString(), user);
            return Ok(user);
        }


        //http://localhost:64014/api/authentication?Username=Mia&Password=dsad
        [HttpGet, Route("api/authentication")]
        public IHttpActionResult Get(string username, string password)
        {
            var s = new ApartmentService();

            if (!s.CheckIfValidLogin(username, password))
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut, Route("api/authentication")]
        public IHttpActionResult Put([FromBody]User user, string newPassword)
        {
            if (user == null || String.IsNullOrEmpty(newPassword))
            {
                return BadRequest("user and newPassword cant be empty");
            }
            var s = new ApartmentService();
            if (s.ChangePassword(user, newPassword))
            {
                return Ok();
            }

            return NotFound();

        }
    }
}
