using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using MongoDB.Driver;
using System.Text.RegularExpressions;

namespace CRUDReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddController : ControllerBase
    {
        static string name = "^[a-zA-Z\\s]+$";
        static string designation = "^[a-zA-Z\\s]+$";
        Regex nam = new Regex(name);
        Regex desig = new Regex(designation);
        [HttpPost("create")]
        public Response Post([FromBody] Employee sc)
        {
            if (nam.IsMatch(sc.Name) && desig.IsMatch(sc.Designation))
            {
                DataConnectivity abc = new DataConnectivity();
                return abc.EnterData(sc);
            }
            else {
                Response a = new Response();
                a.Message = "unable to enter data";
                return a;
            }
            
        }
        [HttpGet("read")]
        public List<Employee> Get()
        {
            DataConnectivity abc = new DataConnectivity();
            return abc.ListDatas();
        }
        [HttpDelete("delete")]
        public Response Delete([FromBody] string id)
        {
                DataConnectivity abc = new DataConnectivity();
            Response a= new Response();
            a.Message = "Data got Deleted";
            a.Employees = abc.deletefind(id);
            abc.deletedata(id);
            return a;
           
        }
        [HttpPut("update")]
        public Response Put([FromBody] Employee sc)
        {
            if (nam.IsMatch(sc.Name) && desig.IsMatch(sc.Designation))
            {
                DataConnectivity abc = new DataConnectivity();
                var updated = abc.updatedata(sc);
                Response a = new Response();
                a.Message = "Document got updated";
                a.Employees = abc.updatefind(sc.Id);
                return a;
            }
            else { 
                
                Response a = new Response();
                a.Message = "unable to update";
                    return a;
            }
            
        }
    }
}
