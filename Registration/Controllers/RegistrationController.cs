using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Registration.Models;

namespace Registration
{
    [Produces("application/json")]
    [Route("api/RegistrationAPI")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IDocumentDBRepository<Registrations> Respository;
        public RegistrationController(IDocumentDBRepository<Registrations> Respository)
        {
            this.Respository = Respository;
        }

        [Route("Registrations/all")]
        [HttpGet]
        public IActionResult Get()
        {
            var registrations = Respository.GetItemsAsync(d => !d.Completed).Result;
            return Ok(registrations);
        }

        // GET api/Registrations/5
        [Route("Registrations/{id}")]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var registration = Respository.GetItemAsync(id).Result;
            return Ok(registration);
        }

        // POST api/values
        [Route("Registrations/Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Registrations value)
        {
            var registration = Respository.CreateItemAsync(value).Result;
            return Ok(registration);
        }

        // PUT api/values/5
        [Route("Registrations/Update/{id}")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Registrations value)
        {
            var registration = Respository.UpdateItemAsync(id,value);
            return Ok(registration.Result);
        }

        // DELETE api/values/5
        [Route("Registrations/Delete/{id}")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var res = Respository.DeleteItemAsync(id);
            return Ok(res.Status);
        }
    }
}