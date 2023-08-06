using MongoDB.Driver;

namespace CRUDReact
{
    public class Response
    {      
            public string Message { get; set; }
            public List<Employee> Employees { get; set; }
        
    }
}
