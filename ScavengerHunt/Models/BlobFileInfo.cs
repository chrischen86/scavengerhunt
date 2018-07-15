using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScavengerHunt.Models
{
    public class BlobFileInfo
    {
        public string FileName { get; set; }
        public string ChallengeId { get; set; }
        public string TeamId { get; set; }
        public Uri Uri { get; set; }
    }
}