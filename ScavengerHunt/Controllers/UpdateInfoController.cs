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
    public class UpdateInfoController : ApiController
    {
        [Dependency]
        public IScoreService ScoreService { get; set; }

        public UpdateInfoEntity Get()
        {
            var updateInfo = ScoreService.GetUpdateInfo();
            return updateInfo;
        }
    }
}
