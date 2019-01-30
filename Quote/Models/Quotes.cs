using System;
using Microsoft.Azure.Documents;
using Newtonsoft.Json;

namespace  Quote.Models
{
    public class Quotes
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "submissionid")]
        public string SubmissionId { get; set; }

        [JsonProperty(PropertyName = "risktype")]
        public string RiskType { get; set; }

        [JsonProperty(PropertyName = "employeecount")]
        public int EmployeeCount { get; set; }

        [JsonProperty(PropertyName = "limit")]
        public int Limit { get; set; }

        [JsonProperty(PropertyName = "retention")]
        public int Retention { get; set; }

        [JsonProperty(PropertyName = "equityrisks")]
        public string EquityRisks { get; set; }

        [JsonProperty(PropertyName = "tierscore")]
        public int TierScore { get; set; }

        [JsonProperty(PropertyName = "quoteamount")]
        public float QuoteAmount { get; set; }

        [JsonProperty(PropertyName = "isComplete")]
        public bool Completed { get; set; }
    }
}