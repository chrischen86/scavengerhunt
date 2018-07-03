using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScavengerHunt.Models
{
    public class EventEntity : TableEntity
    {
        public DateTime Date { get; set; }
        public List<ChallengeEntity> Challenges { get; set; }

        public EventEntity(DateTime date)
        {
            Date = date;

            PartitionKey = "Event";
            RowKey = date.ToString();
        }
    }
}