using ScavengerHunt.Models;
using ScavengerHunt.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity.Attributes;

namespace ScavengerHunt.Controllers
{
    [EnableCors("*", "*", "*")]
    public class PastChallengeController : ApiController
    {
        [Dependency]
        public IChallengeService ChallengeService { get; set; }

        public IEnumerable<ChallengeEntity> Get()
        {
            var challenges = ChallengeService.GetPastChallenges().Where(c => c.IsPastAvailable).OrderBy(c => c.Id);
            return challenges;
        }
    }
}
