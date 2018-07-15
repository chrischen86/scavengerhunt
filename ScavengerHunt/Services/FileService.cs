using Microsoft.WindowsAzure.Storage.Blob;
using ScavengerHunt.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ScavengerHunt.Services
{
    public class FileService : IFileService
    {
        private CloudBlobContainer _container;

        public FileService()
        {
            _container = BlobHelper.GetBlobContainer("407FileContainer");
        }

        public async Task<CloudBlob> SaveFileStreamAsync(FileStream stream, string fileName, string contentType, string teamId, string challengeId)
        {
            var uniqueFileName = GenerateFileName(fileName, teamId, challengeId);
            var blob = _container.GetBlockBlobReference(uniqueFileName);

            blob.Metadata.Add("teamId", teamId);
            blob.Metadata.Add("challengeId", challengeId);
            blob.Properties.ContentType = contentType; 

            await blob.UploadFromStreamAsync(stream);

            return blob;
        }

        public IEnumerable<BlobFileInfo> GetBlobsByTeam(string teamId)
        {
            var blobs = _container.ListBlobs(blobListingDetails:BlobListingDetails.Metadata)
                .OfType<CloudBlob>()
                .Where(b => b.Metadata.ContainsKey("teamId") && b.Metadata["teamId"].Equals(teamId));
            var toReturn = new List<BlobFileInfo>();
            foreach (var blob in blobs)
            {
                var fileInfo = new BlobFileInfo
                {
                    FileName = blob.Name,
                    TeamId = blob.Metadata["teamId"],
                    ChallengeId = blob.Metadata["challengeId"],
                    Uri = blob.Uri,
                };
                toReturn.Add(fileInfo);
            }
            return toReturn;
        }

        public IEnumerable<BlobFileInfo> GetBlobsByChallenge(string challengeId)
        {
            var blobs = _container.ListBlobs(blobListingDetails: BlobListingDetails.Metadata)
                .OfType<CloudBlob>()
                .Where(b => b.Metadata.ContainsKey("challengeId") && b.Metadata["challengeId"].Equals(challengeId));
            var toReturn = new List<BlobFileInfo>();
            foreach (var blob in blobs)
            {
                var fileInfo = new BlobFileInfo
                {
                    FileName = blob.Name,
                    TeamId = blob.Metadata["teamId"],
                    ChallengeId = blob.Metadata["challengeId"],
                    Uri = blob.Uri,
                };
                toReturn.Add(fileInfo);
            }
            return toReturn;
        }

        private string GenerateFileName(string fileName, string teamId, string challengeId)
        {
            var challengeFileName = fileName.TrimStart('"').TrimEnd('"');
            challengeFileName = string.Format("{0}_{1}_{2}", challengeId, teamId, challengeFileName);
            return challengeFileName;
        }
    }
}