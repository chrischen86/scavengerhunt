using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Table;
using ScavengerHunt.Models;
using ScavengerHunt.Services;
using Unity.Attributes;

namespace ScavengerHunt.Controllers
{
    [EnableCors("*", "*", "*")]
    public class TablesController : Controller
    {
        [Dependency]
        public IObjectService ObjectService { get; set; }

        // GET: Tables
        [HttpGet]
        public JsonResult Index()
        {
            var jsonResult = new { Message = "Welcome to the tables index", Status = "Success" };
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CreateTable()
        {
            ObjectService.Init();

            var jsonResult = new { Message = "Tables created", Status = "Success" };
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetChallenges()
        {
            var challenges = ObjectService.GetEntities<ChallengeEntity>();
            return Json(challenges, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddChallenge(ChallengeEntity challenge)
        { 
            var result = ObjectService.AddEntity<ChallengeEntity>(challenge);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddChallenges(IEnumerable<ChallengeEntity> challenges)
        {
            var validated = challenges.Except(challenges.Where(c => c.Date == DateTimeOffset.MinValue));
            var result = ObjectService.AddEntities(validated);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SetScores(IEnumerable<ScoreEntity> scores)
        {
            var result = ObjectService.AddEntities<ScoreEntity>(scores);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetScores()
        {
            var scores = ObjectService.GetEntities<ScoreEntity>();
            return Json(scores, JsonRequestBehavior.AllowGet);
        }
    }
}