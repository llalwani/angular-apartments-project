using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ApartmentsCore
{
    public class ApartmentsAppContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Apartment> Apartments { get; set; }

        public ApartmentsAppContext()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<ApartmentsAppContext>());

        }
    }
}
