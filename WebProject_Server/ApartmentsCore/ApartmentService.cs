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
                if (db.Users.Any(u => u.Username == user.Username || u.Email == user.Email))
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
        public void AddApartment(Apartment apartment)
        {
            using (var db = new ApartmentsAppContext())
            {

                db.Apartments.Add(apartment);
                db.SaveChanges();
            }
        }

        public List<Apartment> LoadApartments()
        {
            using (var db = new ApartmentsAppContext())
            {
                IQueryable<Apartment> apartments = from e in db.Apartments select e;
                return apartments.ToList();

            }
        }

        public bool DeleteApartment(Apartment Apartment)
        {
            using (var db = new ApartmentsAppContext())
            {
                Apartment DeletedApartment = db.Apartments.Remove(Apartment);
                return DeletedApartment != null;
            }
        }
        #endregion

    }
}