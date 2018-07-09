using ScavengerHunt.Models;
using ScavengerHunt.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Filters;
using Unity.Attributes;

namespace ScavengerHunt.Controllers
{
    [EnableCors("*", "*", "*", "LastUpdated")]
    [LastUpdatedHeaderFilter]
    public class ScoresController : ApiController
    {
        [Dependency]
        public IScoreService ScoreService { get; set; }

        public IEnumerable<ScoreEntity> Get()
        {
            var scores = ScoreService.GetScores();
            var updateInfo = ScoreService.GetUpdateInfo();
            var updateDate = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(updateInfo.LastUpdated, "Eastern Standard Time");
            Request.Properties["LastUpdated"] = updateDate.ToString("MMMM, d yyyy, hh:mm:ss tt");

            return scores;
        }
    }

    public class LastUpdatedHeaderFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            var lastUpdated = actionExecutedContext.Request.Properties["LastUpdated"].ToString();
            actionExecutedContext.Response.Content.Headers.Add("LastUpdated", lastUpdated);
            base.OnActionExecuted(actionExecutedContext);
        }
    }
}
