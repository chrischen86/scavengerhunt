using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ScavengerHunt.Models;
using ScavengerHunt.Services;
using Swashbuckle.Swagger.Annotations;
using Unity.Attributes;

namespace ScavengerHunt.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ValuesController : ApiController
    {
        [Dependency]
        public IChallengeService ChallengeService { get; set; }

        // GET api/values
        [SwaggerOperation("GetAll")]
        public IEnumerable<ChallengeEntity> Get()
        {
            var challenges = ChallengeService.GetPastChallenges();
            return challenges;
        }

        // GET api/values/5
        [SwaggerOperation("GetById")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        public IEnumerable<ChallengeEntity> Get(DateTime dateTime)
        {
            var challenges = ChallengeService.GetDailyChallenges();
            return challenges;
        }

        // POST api/values
        [SwaggerOperation("Create")]
        [SwaggerResponse(HttpStatusCode.Created)]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [SwaggerOperation("Update")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [SwaggerOperation("Delete")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        public void Delete(int id)
        {
        }
    }
}
