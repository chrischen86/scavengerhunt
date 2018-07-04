using ScavengerHunt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity.Attributes;

namespace ScavengerHunt.Services
{
    public class ScoreService : IScoreService
    {
        [Dependency]
        public IObjectService ObjectService { get; set; }

        public IEnumerable<ScoreEntity> GetScores()
        {
            var scores = ObjectService.GetEntities<ScoreEntity>().OrderByDescending(s => s.Score).ThenBy(s => s.Team);
            return scores;
        }
    }
}