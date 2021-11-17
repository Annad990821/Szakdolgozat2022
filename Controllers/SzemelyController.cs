using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Szakdolgozat.Models;
using Szakdolgozat.Models.DTO;
using Szakdolgozat.Services;

namespace Szakdolgozat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SzemelyController : ControllerBase
    {
        private readonly SzemelyService szemelyService;
        private readonly TorlesService torlesService;

        public SzemelyController(SzemelyService _szemelyService,TorlesService _torlesService)
        {
            szemelyService = _szemelyService;
            torlesService = _torlesService;
        }

        [HttpGet("szemelyek")]
        public List<SzemelyDTO> GetSzemelyek()
        {
            return szemelyService.GetSzemelyek();
        }

        [HttpGet("szemelyadatok")]
        public List<SzemelyAdatokDTO> GetSzemelyAdatok()
        {
            return szemelyService.GetSzemelyAdatok();
        }

        [HttpPost("addszemely")]
        public IActionResult AddSzemely([FromBody] Szemely szemely)
        {
            szemelyService.AddSzemely(szemely);
            return Ok();
        }

        [HttpPost("updateszemely")]
        public void UpdateSzemely([FromBody] Szemely szemely)
        {
            szemelyService.Update(szemely);
        }

        [HttpDelete("removeszemely")]
        public IActionResult RemoveSzemely(int id)
        {
            torlesService.RemoveSzemelyWithAllDependencies(id);
            return Ok();
        }
    }
}
