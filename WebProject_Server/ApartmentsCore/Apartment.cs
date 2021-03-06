﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace ApartmentsCore
{
    public class Apartment
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Address { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public double Price { get; set; }

        [DataMember]
        public string SellerPhoneNummber { get; set; }


        //--Google maps location
        [DataMember]
        public double Lat { get; set; }

        [DataMember]
        public double Lng { get; set; }

        //Google maps location--

        [DataMember]
        public int RoomsNumber { get; set; }

        [DataMember]
        public double ApartmentSize { get; set; }

        [DataMember]
        public bool hasParking { get; set; }

        [DataMember]
        public bool hasAirConditining { get; set; }

        [DataMember]
        public bool hasFurniture { get; set; }

        public virtual User User { get; set; }

        public virtual List<Image> Images { get; set; }

    }
}
