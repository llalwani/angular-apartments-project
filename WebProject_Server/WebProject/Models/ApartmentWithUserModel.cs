using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ApartmentsCore;

namespace WebProject.Models
{
    public class ApartmentWithUserModel
    {
        public Apartment apartment { get; set; }
        public string username { get; set; } 
    }
}