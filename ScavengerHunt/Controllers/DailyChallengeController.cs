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
    public class DailyChallengeController : ApiController
    {
        [Dependency]
        public IChallengeService ChallengeService { get; set; }

        public IEnumerable<ChallengeEntity> Get()
        {
            var challenges = ChallengeService.GetDailyChallenges();
            return challenges;
        }
    }
}
