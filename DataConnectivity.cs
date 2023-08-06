using Microsoft.Win32;
using MongoDB.Bson;
using MongoDB.Driver;
using System;

namespace CRUDReact
{
    public class DataConnectivity
    {
            private MongoClient connect = new MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2");
  
        public List<Employee> ListDatas()
            {
            var databases = connect.GetDatabase("Register");
            var col = databases.GetCollection<Employee>("Register");
                return col.Find(_ => true).ToList();
            }
            public Response EnterData(Employee sc)
            {
            try
            {
                var database = connect.GetDatabase("Register");
                var col = database.GetCollection<Employee>("Register");
                col.InsertOne(sc);
                Response a = new Response();
                a.Message = "Data Entered Successfully";
                a.Employees = new List<Employee> { sc };
                return a;
            }
            catch (MongoCommandException ex)
            {
                Response a = new Response();
                a.Message = "exception encountered" + ex.Message;

                return a;
            }

            }
        public DeleteResult deletedata(string id)
        {
            var database = connect.GetDatabase("Register");
            var col = database.GetCollection<Employee>("Register");
            var filt = Builders<Employee>.Filter.Eq("_id", ObjectId.Parse(id));
            var sa=col.Find(filt).ToList();
            var emp=col.DeleteOne(filt);
            return emp;
        }
        public UpdateResult updatedata(Employee sc)
        {
            var database = connect.GetDatabase("Register");
            var col = database.GetCollection<Employee>("Register");
            var filt = Builders<Employee>.Filter.Eq("_id", ObjectId.Parse(sc.Id));
            var update = Builders<Employee>.Update
                                            .Set("Name",sc.Name)
                                            .Set("Designation", sc.Designation)
                                            .Set("Experience", sc.Experience);
            var updateresult= col.UpdateOne(filt,update);
            return updateresult;
        }
        public List<Employee> updatefind(string id)
        {
            var databases = connect.GetDatabase("Register");
            var col = databases.GetCollection<Employee>("Register");
            var filt = Builders<Employee>.Filter.Eq("_id", ObjectId.Parse(id));
            return col.Find(filt).ToList();
        }
        public List<Employee> deletefind(string id)
        {
            var databases = connect.GetDatabase("Register");
            var col = databases.GetCollection<Employee>("Register");
            var filt = Builders<Employee>.Filter.Eq("_id", ObjectId.Parse(id));
            return col.Find(filt).ToList();
        }


    }
}
