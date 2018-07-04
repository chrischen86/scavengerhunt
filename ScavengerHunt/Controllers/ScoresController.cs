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
    public class ScoresController : ApiController
    {
        [Dependency]
        public IScoreService ScoreService { get; set; }

        public IEnumerable<ScoreEntity> Get()
        {
            var scores = ScoreService.GetScores();
            return scores;
        }
    }
}
