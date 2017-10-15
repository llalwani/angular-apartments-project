using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApartmentsCore;
using WebProject.Models;
using System.Web.Http.Cors;

namespace WebProject.Controllers
{
    public class ApartmentsController : ApiController
    {
        [HttpGet, Route("api/apartments")]
        public IEnumerable<Apartment> Get()
        {
            var s = new ApartmentService();
            var m = new List<Apartment>();

            s.LoadApartments(m);
            return m;
        }

        [HttpPost, Route("api/apartments")]
        public IHttpActionResult Post(ApartmentWithUserModel apartment)
        {
            if(apartment==null || apartment.apartment == null || String.IsNullOrEmpty(apartment.username))
            {
                return BadRequest("apartment can't be Null");
            }
            Apartment returnedApartment = new Apartment();
            returnedApartment.Address = apartment.apartment.Address;
            returnedApartment.Description = apartment.apartment.Description;
            returnedApartment.Price = apartment.apartment.Price;
            var s = new ApartmentService();
            s.AddApartment(returnedApartment, apartment.username);
            return Ok(apartment);
        }

        [HttpDelete, Route("api/apartments")]
        public IHttpActionResult Delete(int id)
        {
            var s = new ApartmentService();
            if(s.DeleteApartment(id))
            {
                return Ok("success");
            }
            return NotFound();
        }
    }
}
