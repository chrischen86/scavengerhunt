using Microsoft.WindowsAzure.Storage.Blob;
using ScavengerHunt.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ScavengerHunt.Services
{
    public interface IFileService
    {
        Task<CloudBlob> SaveFileStreamAsync(FileStream stream, string fileName, string contentType, string teamId, string challengeId);

        IEnumerable<BlobFileInfo> GetBlobsByTeam(string teamId);
        IEnumerable<BlobFileInfo> GetBlobsByChallenge(string challengeId);
    }
}