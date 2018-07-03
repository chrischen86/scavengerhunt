using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScavengerHunt.Services
{
    public interface IObjectService
    {
        void Init();
        List<T> GetEntities<T>() where T : ITableEntity, new();
        List<T> GetEntities<T>(string filterCondition) where T : ITableEntity, new();
        TableResult GetEntity<T>(T entity) where T : ITableEntity;        
        T AddEntity<T>(T entity) where T : ITableEntity;
        List<T> AddEntities<T>(IEnumerable<T> entities) where T : ITableEntity;
    }
}
