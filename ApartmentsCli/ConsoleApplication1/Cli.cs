using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Cli
    {
        public void PrintCommands()
        {
            Console.WriteLine("get_all : Will get all the apartment exists");
            Console.WriteLine("get_by_price price_from price_to : Will get all the apartment which price in the range");
            Console.WriteLine("get_by_address address : Will get all the apartment which address contains the address specified");
            Console.WriteLine("type commands to get the commands");
            Console.WriteLine("type exit to stop\n");
        }

        public void Start()
        {
            Console.WriteLine("Welcome to Apartments project console!");
            Console.WriteLine("--------------------------------------------");
            PrintCommands();
            while (true)
            {

                try
                {
                    ParseInput();
                } catch(Exception)
                {
                    Console.WriteLine("Wrong command or arguments!, try again");
                }
            }
        }

        public void ParseInput()
        {
            Apartment apt = new Apartment();
            string input = Console.ReadLine();
            if(string.IsNullOrEmpty(input))
            {
                throw new Exception();
            }
            string[] arguments = input.Split(' ');

           switch (arguments[0])
            {
                case "get_all":
                    apt.Print_Apartments(ApartmentsSearchType.ALL);
                    break;

                case "get_by_price":
                    if (arguments.Length != 3) throw new Exception();
                    apt.Print_Apartments(ApartmentsSearchType.BY_PRICE, Convert.ToDouble(arguments[1]), Convert.ToDouble(arguments[2]));
                    break;

                case "get_by_address":
                    if (arguments.Length != 2) throw new Exception();
                    apt.Print_Apartments(ApartmentsSearchType.BY_ADDRESS, 0, 0, arguments[1]);
                    break;

                case "commands":
                    PrintCommands();
                    break;

                case "exit":
                    Environment.Exit(0);
                    break;

                default:
                    Console.WriteLine("Unknown Command! type commands to get the commands");
                    break;
            }
        }
    }
}
