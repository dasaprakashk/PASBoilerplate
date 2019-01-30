using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Submission.Models;

namespace Submission
{
    [Produces("application/json")]
    [Route("api/SubmissionAPI")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly IDocumentDBRepository<Submissions> Respository;
        public SubmissionController(IDocumentDBRepository<Submissions> Respository)
        {
            this.Respository = Respository;
        }

        [Route("Submissions/all")]
        [HttpGet]
        public IActionResult Get()
        {
            var submissions = Respository.GetItemsAsync(d => !d.Completed).Result;
            return Ok(submissions);
        }

        // GET api/submissions/5
        [Route("Submissions/{id}")]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var submission = Respository.GetItemAsync(id).Result;
            return Ok(submission);
        }

        // POST api/values
        [Route("Submissions/Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Submissions value)
        {
            var submission = Respository.CreateItemAsync(value).Result;
            return Ok(submission);
        }

        // PUT api/values/5
        [Route("Submissions/Update/{id}")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Submissions value)
        {
            var submission = Respository.UpdateItemAsync(id,value);
            return Ok(submission.Result);
        }

        // DELETE api/values/5
        [Route("Submissions/Delete/{id}")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var res = Respository.DeleteItemAsync(id);
            return Ok(res.Status);
        }
    }
}