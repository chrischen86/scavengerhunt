using ScavengerHunt.Models;
using System.Collections.Generic;

namespace ScavengerHunt.Services
{
    public interface IScoreService
    {
        IEnumerable<ScoreEntity> GetScores();
        UpdateInfoEntity GetUpdateInfo();
        UpdateInfoEntity SetUpdateInfo();
    }
}