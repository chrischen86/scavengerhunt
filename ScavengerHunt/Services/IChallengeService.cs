using ScavengerHunt.Models;
using System.Collections.Generic;

namespace ScavengerHunt.Services
{
    public interface IChallengeService
    {
        IEnumerable<ChallengeEntity> GetDailyChallenges();
        IEnumerable<ChallengeEntity> GetPastChallenges();
    }
}