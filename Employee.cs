using MongoDB.Bson.Serialization.Attributes;

namespace CRUDReact
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
            public string? Id { get; set; }

            public string? Name { get; set; }

            public string? Designation { get; set; }
            public int Experience { get; set; }
        }
    }

