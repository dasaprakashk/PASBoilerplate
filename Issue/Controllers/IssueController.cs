using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Issue.Models;

namespace Issue
{
    [Produces("application/json")]
    [Route("api/IssueAPI")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        private readonly IDocumentDBRepository<Issues> Respository;
        public IssueController(IDocumentDBRepository<Issues> Respository)
        {
            this.Respository = Respository;
        }

        [Route("issues/all")]
        [HttpGet]
        public IActionResult Get()
        {
            var issues = Respository.GetItemsAsync(d => !d.Completed).Result;
            return Ok(issues);
        }

        // GET api/Registrations/5
        [Route("issues/{id}")]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var issue = Respository.GetItemAsync(id).Result;
            return Ok(issue);
        }

        // POST api/values
        [Route("issues/Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Issues value)
        {
            var issue = Respository.CreateItemAsync(value).Result;
            return Ok(issue);
        }

        // PUT api/values/5
        [Route("issues/Update/{id}")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Issues value)
        {
            var issue = Respository.UpdateItemAsync(id,value);
            return Ok(issue.Result);
        }

        // DELETE api/values/5
        [Route("issues/Delete/{id}")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var res = Respository.DeleteItemAsync(id);
            return Ok(res.Status);
        }
    }
}