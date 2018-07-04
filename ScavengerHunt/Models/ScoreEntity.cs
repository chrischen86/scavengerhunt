using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScavengerHunt.Models
{
    public class ScoreEntity : TableEntity
    {
        private int _id;
        public int Id { get => _id; set { _id = value; RowKey = value.ToString(); } }

        public string Team { get; set; }
        public int Score { get; set; }

        public ScoreEntity(int id)
        {
            PartitionKey = "score";
            RowKey = id.ToString();
        }

        public ScoreEntity()
        {
            PartitionKey = "score";
        }
    }
}