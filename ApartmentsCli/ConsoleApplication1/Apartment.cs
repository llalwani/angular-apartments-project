using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using System.IO;

namespace ConsoleApplication1
{

    public enum ApartmentsSearchType
    {
        ALL,
        BY_PRICE,
        BY_ADDRESS
    }
    class Apartment
    {
        public const string url = "http://localhost:50743";

        public List<ApartmentModel> GetAllApartments()
        {
            var client = new RestClient(url);
            var request = new RestRequest("api/apartments");
            request.Method = Method.GET;
            return client.Execute<List<ApartmentModel>>(request).Data;
        }

        public List<ApartmentModel> GetApartmentsByPrice(double price_from, double price_to)
        {
            var client = new RestClient(url);
            var request = new RestRequest("api/apartments");
            request.AddParameter("Price_from", price_from);
            request.AddParameter("Price_to", price_to);
            request.Method = Method.GET;
            return client.Execute<List<ApartmentModel>>(request).Data;
        }


        public List<ApartmentModel> GetApartmentsByAddress(string address)
        {
            var client = new RestClient(url);
            var request = new RestRequest("api/apartments");
            request.AddParameter("Address", address);
            request.Method = Method.GET;
            return client.Execute<List<ApartmentModel>>(request).Data;
        }

        public void Print_Apartments(ApartmentsSearchType type, double price_from = 0, double price_to = 0, string address = "")
        {
            List<ApartmentModel> apartments = new List<ApartmentModel>();
            switch (type)
            {
                case ApartmentsSearchType.ALL:
                    apartments = GetAllApartments();
                    break;

                case ApartmentsSearchType.BY_PRICE:
                    apartments = GetApartmentsByPrice(price_from, price_to);
                    break;

                case ApartmentsSearchType.BY_ADDRESS:
                    apartments = GetApartmentsByAddress(address);
                    break;
            }

            if (apartments.Count == 0)
            {
                Console.WriteLine("Oops, No apartments found to display");
                return;
            }
            Console.WriteLine("Found " + apartments.Count + " Apartments, Printing..");
            foreach (var apt in apartments)
            {
                PrintApartment(apt);
            }

            ExportToCSV(apartments);
        }

        public void PrintApartment(ApartmentModel apartment)
        {
            Console.WriteLine("Address:");
            Console.WriteLine(apartment.Address);
            Console.WriteLine("Description:");
            Console.WriteLine(apartment.Description);
            Console.WriteLine("Price:");
            Console.WriteLine(apartment.Price);
            Console.WriteLine(string.Format("Has Furnature: {0} Has Parking: {1} Has Air Conditining: {2}", apartment.hasFurniture, apartment.hasParking, apartment.hasAirConditining));
            Console.WriteLine("Contact Phone number:");
            Console.WriteLine(apartment.SellerPhoneNummber);
            Console.WriteLine("----------------------------------------");
        }

        public void ExportToCSV(List<ApartmentModel> apartments)
        {
            var csv = new StringBuilder();
            string filePath = @"e:\apartments.csv";
            var newLine = string.Format("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\",\"{5}\",\"{6}\"", "Address", "Price", "Description", "Has Furnature", "Has Parking", "Has Air Conditing", "Contact Phone Number");
            csv.AppendLine(newLine);
            foreach (var Apt in apartments)
            {
                newLine = string.Format("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\",\"{5}\",\"{6}\"", Apt.Address, Apt.Price, Apt.Description, Apt.hasFurniture, Apt.hasParking, Apt.hasAirConditining, Apt.SellerPhoneNummber);
                csv.AppendLine(newLine);
            }
            File.WriteAllText(filePath, csv.ToString());

        }
    }
}
