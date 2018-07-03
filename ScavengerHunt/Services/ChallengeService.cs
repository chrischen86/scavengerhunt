using Microsoft.WindowsAzure.Storage.Table;
using ScavengerHunt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity.Attributes;

namespace ScavengerHunt.Services
{
    public class ChallengeService : IChallengeService
    {
        [Dependency]
        public IObjectService ObjectService { get; set; }

        public IEnumerable<ChallengeEntity> GetDailyChallenges()
        {
            var toReturn = new List<ChallengeEntity>();

            //var date = DateTime.UtcNow.Date;
            //var timezone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            //var dateOffset = TimeZoneInfo.ConvertTime(TimeZoneInfo.ConvertTime(date, timezone).Date, timezone);

            var eastern = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTimeOffset.UtcNow, "Eastern Standard Time").Date;
            var queryTime = new DateTimeOffset(eastern, TimeSpan.FromHours(-4));

            var filter = TableQuery.GenerateFilterConditionForDate("Date", QueryComparisons.Equal, queryTime);
            var result = ObjectService.GetEntities<ChallengeEntity>(filter);
            toReturn.AddRange(result);
            return toReturn;
        }

        public IEnumerable<ChallengeEntity> GetPastChallenges()
        {
            var toReturn = new List<ChallengeEntity>();

            var eastern = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTimeOffset.UtcNow, "Eastern Standard Time")
                .Date
                .AddDays(-1);
            var queryTime = new DateTimeOffset(eastern, TimeSpan.FromHours(-4));

            var filter = TableQuery.GenerateFilterConditionForDate("Date", QueryComparisons.LessThanOrEqual, queryTime);
            var result = ObjectService.GetEntities<ChallengeEntity>(filter);
            toReturn.AddRange(result);
            return toReturn;
        }

    }
}