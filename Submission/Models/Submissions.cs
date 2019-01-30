using System;
using Microsoft.Azure.Documents;
using Newtonsoft.Json;

namespace  Submission.Models
{
    public class Submissions
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "accountid")]
        public string AccountId { get; set; }

        [JsonProperty(PropertyName = "inceptiondate")]
        public string InceptionDate { get; set; }

        [JsonProperty(PropertyName = "expirydate")]
        public string ExpiryDate { get; set; }

        [JsonProperty(PropertyName = "applicantname")]
        public string ApplicantName { get; set; }

        [JsonProperty(PropertyName = "applicantemail")]
        public string ApplicantEmail { get; set; }

        [JsonProperty(PropertyName = "city")]
        public string City { get; set; }

        [JsonProperty(PropertyName = "zip")]
        public int Zip { get; set; }

        [JsonProperty(PropertyName = "state")]
        public string State { get; set; }

        [JsonProperty(PropertyName = "domicilestate")]
        public string DomicileState { get; set; }

        [JsonProperty(PropertyName = "wsgusa")]
        public string WsgUSA { get; set; }

        [JsonProperty(PropertyName = "coverages")]
        public string Coverages { get; set; }

        [JsonProperty(PropertyName = "underwriter")]
        public string Underwriter { get; set; }

        [JsonProperty(PropertyName = "natureofops")]
        public string NatureOfOps { get; set; }

        [JsonProperty(PropertyName = "mgcis")]
        public string MGCIS { get; set; }

        [JsonProperty(PropertyName = "submissionrecdate")]
        public string SubmissionRecDate { get; set; }

        [JsonProperty(PropertyName = "isComplete")]
        public bool Completed { get; set; }
    }
}