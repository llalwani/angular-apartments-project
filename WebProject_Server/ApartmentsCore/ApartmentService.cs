﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ApartmentsCore
{
    public class ApartmentService
    {
        #region User_Functions
        public bool CheckIfValidLogin(string username, string password)
        {
            using (var db = new ApartmentsAppContext())
            if (db.Users.Any(c => c.Username == username && c.Password == password))
            {
                return true;
            }
            return false;
        }
        

        public void RegisterUser(User user)
        {
            using (var db = new ApartmentsAppContext())
            {
                if (db.Users.Any(u => u.Username == user.Username ))
                {
                    throw new UserNameOrEmailAlreadyExistsException();
                }
                db.Users.Add(user);
                db.SaveChanges();
            }
        }

        public bool ChangePassword(User user, string newPassword)
        {
            using (var db = new ApartmentsAppContext())
            {
                User userInDb = db.Users.Find(user);
                if (userInDb == null || String.IsNullOrEmpty(newPassword))
                {
                    return false;
                }
                db.Users.Attach(user);
                user.Password = newPassword;
                db.Entry(user).Property(x => x.Password).IsModified = true;
                db.SaveChanges();
                return true;
            }
        }
        

        [Serializable]
        public class UserNameOrEmailAlreadyExistsException : Exception
        {
            public UserNameOrEmailAlreadyExistsException()
            {
            }

            public UserNameOrEmailAlreadyExistsException(string message) : base(message)
            {
            }

            public UserNameOrEmailAlreadyExistsException(string message, Exception innerException) : base(message, innerException)
            {
            }

            protected UserNameOrEmailAlreadyExistsException(SerializationInfo info, StreamingContext context) : base(info, context)
            {
            }
        }
        #endregion

        #region Apartment_Functions
        public Apartment AddApartment(Apartment apartment, string username)
        {
            using (var db = new ApartmentsAppContext())
            {
                User user = db.Users.Where(myuser => myuser.Username == username).FirstOrDefault();
                if (user != null)
                {
                    // Add user to the relvant apartment
                    apartment.User = user;
                    db.Apartments.Add(apartment);

                    //Add apartment to the user
                    user.Apartments.Add(apartment);
                }
                //TODO: Throw exception
                db.SaveChanges();
                return db.Apartments.Find(apartment.Id);
            }
        }

        public void LoadApartments(ICollection<Apartment> apartments)
        {
            using (var db = new ApartmentsAppContext())
            {
                //IQueryable<Apartment> apartments = from e in db.Apartments select e;
                // return apartments.ToList();

                IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images");

                foreach (var apartment in query)
                {
                    apartments.Add(apartment);
                }
            }
        }

        //public Apartment getApartment(int apartment_id)
        //{
        //    using (var db = new ApartmentsAppContext())
        //    {
        //        return db.Apartments.Include("User").Include("Images").FirstOrDefault(x => x.Id == apartment_id);
        //    }
        //}


        public void LoadApartmentsByFilter(ICollection<Apartment> apartments, string address, double price_from, double price_to)
        {
            using (var db = new ApartmentsAppContext())
            {
                // if two fields missing search by the thrid
                if (String.IsNullOrEmpty(address) && price_from == 0)
                {
                    IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images").Where(apt => apt.Price <= price_to);
                    foreach (var apartment in query)
                    {
                        apartments.Add(apartment);
                    }
                    return;
                }

                if (String.IsNullOrEmpty(address) && price_to == 0)
                {
                    IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images").Where(apt => apt.Price >= price_from);
                    foreach (var apartment in query)
                    {
                        apartments.Add(apartment);
                    }
                    return;
                }

                if (price_from == 0 && price_to == 0)
                {
                    IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images").Where(apt => apt.Address.Contains(address));
                    foreach (var apartment in query)
                    {
                        apartments.Add(apartment);
                    }
                    return;
                }
                // if one field missing search by the two
                if (String.IsNullOrEmpty(address))
                {
                    IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images").Where(apt => apt.Price >= price_from && apt.Price <= price_to);
                    foreach (var apartment in query)
                    {
                        apartments.Add(apartment);
                    }
                    return;
                }

                if (price_from == 0)
                {
                    IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images").Where(apt => apt.Price <= price_to && apt.Address.Contains(address));
                    foreach (var apartment in query)
                    {
                        apartments.Add(apartment);
                    }
                    return;
                }

                if (price_to == 0)
                {
                    IQueryable<Apartment> query = db.Apartments.Include("User").Include("Images").Where(apt => apt.Price >= price_from && apt.Address.Contains(address));
                    foreach (var apartment in query)
                    {
                        apartments.Add(apartment);
                    }
                    return;
                }

                //if all fields filled
                IQueryable<Apartment> query1 = db.Apartments.Include("User").Include("Images").Where(apt => apt.Price >= price_from && apt.Price <= price_to && apt.Address.Contains(address));
                foreach (var apartment in query1)
                {
                    apartments.Add(apartment);
                }
                return;
            }
        }
        public List<Apartment> LoadMyApartments(string username)
        {
            using (var db = new ApartmentsAppContext())
            {
                //IQueryable<Apartment> apartments = from e in db.Apartments select e;
                // return apartments.ToList();
                User user = db.Users.Where(myuser => myuser.Username == username).FirstOrDefault();
                if (user != null)
                {
                   return new List<Apartment>(user.Apartments.Select(x => new Apartment
                    {
                        Id = x.Id,
                        Description = x.Description,
                        Address = x.Address,
                        Price = x.Price,
                        //  ApartmentSize = x.ApartmentSize,
                        // hasAirConditining = x.hasAirConditining,
                        //x.hasFurniture,x.hasParking,x.RoomsNumber
                    }).ToList());

                }
                return null;
                //if(user!= null)
                //{
                //    foreach (var apartment in user.Apartments)
                //    {
                //        apartments.Add(apartment);
                //    }
                //}
            }
        }

        public bool DeleteApartment(int id)
        {
            using (var db = new ApartmentsAppContext())
            {
                Apartment apartment = db.Apartments.Find(id);
                if(apartment == null)
                {
                    return false;
                }
                Apartment DeletedApartment = db.Apartments.Remove(apartment);
                db.SaveChanges();
                return DeletedApartment != null;
            }
        }


        //public string[] getApartmentImages(int apartmentId)
        //{
        //    using (var db = new ApartmentsAppContext())
        //    {
        //        Apartment apartment = db.Apartments.Find(apartmentId);
        //        if (apartment == null || apartment.Images == null || apartment.Images.Count ==0)
        //        {
        //            return null;
        //        }
        //        string[] resultArray = new string[apartment.Images.Count];
        //        int index = 0;
        //        foreach (Image image in apartment.Images) {
        //            resultArray[index++] = System.Convert.ToBase64String(image.ImageData);
        //        }
        //        return resultArray;
        //    }
        //}
        #endregion
    }
}
