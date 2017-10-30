using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApartmentsCore;
using WebProject.Models;
using System.Web.Http.Cors;
using System.Web;
using System.IO;
using Newtonsoft.Json;

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

        [HttpGet, Route("api/apartments")]
        public Apartment Get(int id)
        {
            var s = new ApartmentService();
            var m = new List<Apartment>();
            return s.getApartment(id);
        }

        //[HttpPost, Route("api/apartments")]
        //public IHttpActionResult Post(ApartmentWithUserModel apartment)
        //{
        //    if (apartment == null || apartment.apartment == null || String.IsNullOrEmpty(apartment.username))
        //    {
        //        return BadRequest("apartment can't be Null");
        //    }
        //    Apartment apartmentToSend = new Apartment();

        //    HttpResponseMessage response = new HttpResponseMessage();
        //    var httpRequest = HttpContext.Current.Request;
        //    if (httpRequest.Files.Count > 0)
        //    {
        //    }
        //    apartmentToSend = apartment.apartment;
        //    var s = new ApartmentService();
        //    return Ok(s.AddApartment(apartmentToSend, apartment.username));
        //}


        [HttpPost, Route("api/apartments")]
        public IHttpActionResult Post()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            string username = HttpContext.Current.Request.Params["username"];
            string apartment = HttpContext.Current.Request.Params["apartment"];
            Apartment apartmentToSend = JsonConvert.DeserializeObject<Apartment>(apartment);
            if (httpRequest.Files.Count > 0)
            {
                apartmentToSend.Images = new List<Image>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    byte[] imageData = convertFileToByteArray(postedFile);
                    Image image = new Image();
                    image.ImageDataBase64 = System.Convert.ToBase64String(imageData);
                    apartmentToSend.Images.Add(image);
                }
            }
            var s = new ApartmentService();
            return Ok(s.AddApartment(apartmentToSend, username));
        }

        [HttpDelete, Route("api/apartments")]
        public IHttpActionResult Delete(int id)
        {
            var s = new ApartmentService();
            if (s.DeleteApartment(id))
            {
                return Ok("success");
            }
            return NotFound();
        }


        private byte[] convertFileToByteArray(HttpPostedFile File)
        {
            byte[] fileData = null;
            using (var binaryReader = new BinaryReader(File.InputStream))
            {
                fileData = binaryReader.ReadBytes(File.ContentLength);
            }

            return fileData;
        }
    }
}
