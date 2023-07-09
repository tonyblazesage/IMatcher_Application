using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extension_services
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;

            //if (dob.AddYears(age) > today) age--;



            // Check if the birth date has not occurred yet this year
            if (today.Month < dob.Month || (today.Month == dob.Month && today.Day < dob.Day))
            {
                age--; // Subtract 1 from the age
            }

            return age;
        }
    }
}