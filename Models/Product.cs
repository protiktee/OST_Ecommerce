using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace OST_Ecommerce.Models
{
    //[Serialization]
    public class Product
    {
        [DataMember] 
        public string Name { get; set; }
        [DataMember]
        public string Picture { get; set; }
        [DataMember]
        public double Price { get; set; }
        [DataMember]
        public int Quantity { get; set; }
    }
}
