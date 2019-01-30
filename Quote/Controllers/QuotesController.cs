using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Quote.Models;

namespace Quote
{
    [Produces("application/json")]
    [Route("api/QuoteAPI")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly IDocumentDBRepository<Quotes> Respository;
        public QuoteController(IDocumentDBRepository<Quotes> Respository)
        {
            this.Respository = Respository;
        }

        [Route("quotes/all")]
        [HttpGet]
        public IActionResult Get()
        {
            var quotes = Respository.GetItemsAsync(d => !d.Completed).Result;
            return Ok(quotes);
        }

        // GET api/quotes/5
        [Route("quotes/{id}")]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var quote = Respository.GetItemAsync(id).Result;
            return Ok(quote);
        }

        // POST api/values
        [Route("quotes/Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Quotes value)
        {
            Random r = new Random();
            value.QuoteAmount = r.Next(600, 6000);
            var quote = Respository.CreateItemAsync(value).Result;
            return Ok(quote);
        }

        // PUT api/values/5
        [Route("quotes/Update/{id}")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Quotes value)
        {
            var quote = Respository.UpdateItemAsync(id,value);
            return Ok(quote.Result);
        }

        // DELETE api/values/5
        [Route("quotes/Delete/{id}")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var res = Respository.DeleteItemAsync(id);
            return Ok(res.Status);
        }
    }
}
