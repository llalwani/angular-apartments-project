using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApartmentsCore;

namespace WebProject.Controllers
{
    public class ApartmentsController : ApiController
    {
        [HttpGet, Route("api/apartments")]
        public IEnumerable<Apartment> Get()
        {
            var s = new ApartmentService();
            return s.LoadApartments();
        }

        [HttpPost, Route("api/apartments")]
        public IHttpActionResult Post(Apartment apartment)
        {
            if(apartment==null)
            {
                return BadRequest("apartment can't be Null");
            }
            var s = new ApartmentService();
            s.AddApartment(apartment);
            return Ok(apartment);
        }

        [HttpDelete, Route("api/apartments")]
        public IHttpActionResult Delete(Apartment apartment)
        {
            if (apartment == null)
            {
                return BadRequest("apartment can't be Null");
            }
            var s = new ApartmentService();
            s.DeleteApartment(apartment);
            return Ok(apartment);
        }
    }
}
