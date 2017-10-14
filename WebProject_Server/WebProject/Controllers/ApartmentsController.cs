using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApartmentsCore;
using WebProject.Models;

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

        [HttpGet, Route("api/apartments")]
        public Apartment Get(int id)
        {
            var s = new ApartmentService();
            return s.LoadApartment(id);
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
