using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using System.Web;

namespace ApartmentsCore
{
    [DataContract]
    public class Image
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string ImageDataBase64 { get; set; }

    }
}
