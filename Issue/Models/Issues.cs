using System;
using Microsoft.Azure.Documents;
using Newtonsoft.Json;

namespace  Issue.Models
{
    public class Issues
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "accountid")]
        public string AccountId { get; set; }

        [JsonProperty(PropertyName = "quoteid")]
        public string QuoteId { get; set; }

        [JsonProperty(PropertyName = "producername")]
        public string ProducerName { get; set; }

        [JsonProperty(PropertyName = "isComplete")]
        public bool Completed { get; set; }
    }
}