using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extension_services
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1; // default value for return first page

        private int _pageSize = 12; // default value for pagesize

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value; // if value > MaxPageSize, then _pageSize = MaxPageSize, else _pageSize = value
        }
    }
}