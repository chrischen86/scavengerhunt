using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScavengerHunt.Models
{
    public class UpdateInfoEntity : TableEntity
    {
        public int Id { get; }
        public DateTimeOffset LastUpdated { get; set; }

        public UpdateInfoEntity()
        {
            Id = 1;
            PartitionKey = "updateinfo";
            RowKey = "1";
        }
    }
}