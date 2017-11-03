using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class ApartmentModel
    {
        public int Id { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public string SellerPhoneNummber { get; set; }


        //--Google maps location
        public double Lat { get; set; }

        public double Lng { get; set; }

        //Google maps location--

        public int RoomsNumber { get; set; }

        public double ApartmentSize { get; set; }

        public bool hasParking { get; set; }

        public bool hasAirConditining { get; set; }

        public bool hasFurniture { get; set; }
    }
}
