using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScavengerHunt.Services
{
    public class ObjectService : IObjectService
    {
        private const string TABLE_NAME = "challenge";
        private CloudStorageAccount _storageAccount;
        private CloudTableClient _tableClient;
        private CloudTable _table;

        public ObjectService()
        {
            _storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("407hunt_AzureStorageConnectionString"));
            _tableClient = _storageAccount.CreateCloudTableClient();
            _table = _tableClient.GetTableReference(TABLE_NAME);
        }

        public void Init()
        {
            _table.CreateIfNotExists();
        }

        public List<T> GetEntities<T>() where T : ITableEntity, new()
        {
            TableContinuationToken token = null;
            var entities = new List<T>();

            var dummyInstance = Activator.CreateInstance<T>();
            var tableQuery = new TableQuery<T>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, dummyInstance.PartitionKey));
            do
            {
                var queryResult = _table.ExecuteQuerySegmented(tableQuery, token);
                entities.AddRange(queryResult.Results);
                token = queryResult.ContinuationToken;
            } while (token != null);
            return entities;
        }

        public List<T> GetEntities<T>(string filterCondition) where T : ITableEntity, new()
        {
            TableContinuationToken token = null;
            var entities = new List<T>();
            var dummyInstance = Activator.CreateInstance<T>();
            var defaultFilterCondition = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, dummyInstance.PartitionKey);
            var combinedFilterCondition = TableQuery.CombineFilters(defaultFilterCondition, TableOperators.And, filterCondition);
            var tableQuery = new TableQuery<T>().Where(combinedFilterCondition);            
            do
            {
                var queryResult = _table.ExecuteQuerySegmented(tableQuery, token);
                entities.AddRange(queryResult.Results);
                token = queryResult.ContinuationToken;
            } while (token != null);
            return entities;
        }

        public TableResult GetEntity<T>(T entity) where T : ITableEntity
        {
            var operation = TableOperation.Retrieve<T>(entity.PartitionKey, entity.RowKey);
            var result = _table.Execute(operation);
            return result;
        }

        public T AddEntity<T>(T entity) where T : ITableEntity
        {
            var operation = TableOperation.InsertOrReplace(entity);
            var result = _table.Execute(operation);
            return (T)result.Result;
        }

        public TableResult UpdateEntity<T>(T entity) where T : ITableEntity
        {
            var operation = TableOperation.Insert(entity);
            var result = _table.Execute(operation);
            return result;
        }

        public List<T> AddEntities<T>(IEnumerable<T> entities) where T : ITableEntity
        {
            var batchOperation = new TableBatchOperation();
            foreach (var entity in entities)
            {
                batchOperation.InsertOrReplace(entity);
            }
            var result = _table.ExecuteBatch(batchOperation);

            var results = result.Select(r => r.Result).OfType<T>().ToList();
            return results;
        }
    }
}