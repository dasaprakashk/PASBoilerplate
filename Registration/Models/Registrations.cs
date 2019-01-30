using Microsoft.Azure.Documents;
using Newtonsoft.Json;

namespace Registration.Models
{
    public class Registrations
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "producercode")]
        public string ProducerCode { get; set; }

        [JsonProperty(PropertyName = "producername")]
        public string ProducerName { get; set; }

        [JsonProperty(PropertyName = "produceremail")]
        public string ProducerEmail { get; set; }

        [JsonProperty(PropertyName = "accountname")]
        public string AccountName { get; set; }

        [JsonProperty(PropertyName = "isComplete")]
        public bool Completed { get; set; }
    }
}