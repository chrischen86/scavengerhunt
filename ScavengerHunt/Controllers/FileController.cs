using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.WindowsAzure.Storage.Blob;
using ScavengerHunt.Framework;
using ScavengerHunt.Models;
using ScavengerHunt.Services;
using Unity.Attributes;

namespace ScavengerHunt.Controllers
{
    [EnableCors("*", "*", "*")]
    public class FileController : ApiController
    {
        [Dependency]
        public IFileService FileService { get; set; }

        [HttpPost]
        public async Task<HttpResponseMessage> PostFile()
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            var root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data and return an async task.
                await Request.Content.ReadAsMultipartAsync(provider);

                var teamId = provider.FormData["teamId"];
                var challengeId = provider.FormData["challengeId"];

                if (string.IsNullOrEmpty(teamId) || string.IsNullOrEmpty(challengeId) || !provider.FileData.Any())
                {
                    throw new Exception("Form data must include teamid, challengeid and the file(s)");
                }

                foreach (var fileData in provider.FileData)
                {
                    using (var filestream = File.OpenRead(fileData.LocalFileName))
                    {
                        var result = await FileService.SaveFileStreamAsync(filestream, 
                            fileData.Headers.ContentDisposition.FileName,
                            fileData.Headers.ContentType.MediaType,
                            teamId, 
                            challengeId);
                    }
                    File.Delete(fileData.LocalFileName);
                }

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        public IEnumerable<BlobFileInfo> GetByTeamId(string id)
        {
            var results = FileService.GetBlobsByTeam(id);
            return results;
        }

        [HttpGet]
        public IEnumerable<BlobFileInfo> GetByChallengeId(string id)
        {
            var results = FileService.GetBlobsByChallenge(id);
            return results;
        }
    }
}
