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
    public class TeamsController : ApiController
    {
        [Dependency]
        public IObjectService ObjectService { get; set; }

        public IEnumerable<object> Get()
        {
            var teams = ObjectService.GetEntities<TeamEntity>().OrderBy(s => s.Team);
            return teams;
        }
    }
}
