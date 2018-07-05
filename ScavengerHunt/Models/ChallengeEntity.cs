using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScavengerHunt.Models
{
    public class ChallengeEntity : TableEntity
    {
        private int _id;

        public int Id { get => _id; set { _id = value; RowKey = value.ToString(); } }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        //public ChallengeTypes Type { get; set; }
        public int Points { get; set; }
        public string MediaFileName { get; set; }

        public DateTimeOffset Date { get; set; }

        public ChallengeEntity(int id, ChallengeTypes type)
        {
            PartitionKey = "challenge";
            RowKey = id.ToString();
        }

        public ChallengeEntity()
        {
            PartitionKey = "challenge";
        }
    }
}