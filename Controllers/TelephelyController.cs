using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Szakdoga.Models.DTO;
using Szakdoga.Services;
using Szakdolgozat.Models;

namespace Szakdolgozat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TelephelyController : ControllerBase
    {
        private readonly TelephelyService telephelyService;

        public TelephelyController(TelephelyService _telephelyService)
        {
            telephelyService = _telephelyService;
        }

        [HttpPost]
        public int PostTelephely([FromBody] Telephely telephely)
        {
            return telephelyService.PostTelephely(telephely);
        }

        [HttpGet]
        public List<TelephelySelectDTO> GetTelephelyek()
        {
            return telephelyService.GetTelephelyek();
        }

        [HttpGet("loaddata")]
        public void LoadData()
        {
            telephelyService.LoadData();
        }
    }
}
