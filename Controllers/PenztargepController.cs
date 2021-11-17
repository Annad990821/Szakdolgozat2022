using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Szakdolgozat.Models;
using Szakdolgozat.Models.DTO;
using Szakdolgozat.Services;

namespace Szakdolgozat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PenztargepController : ControllerBase
    {
        private readonly PenztargepService penztargepService;

        public PenztargepController(PenztargepService _penztargepService)
        {
            penztargepService = _penztargepService;
        }

        [HttpGet("felulvizsgalatok")]
        public List<PenztargepFelulvizsgalat> GetFelulvizsgalatok()
        {
            return penztargepService.GetPenztargepFelulvizsgalatok();
        }

        [HttpPost]
        public IActionResult CreatePenztargep([FromBody] Penztargep penztargep)
        {
            penztargepService.CreatePenztargep(penztargep);
            return Ok();
        }

        //api/Penztargep/delete?id=1
        [HttpDelete]
        public bool RemovePenztarget(int id)
        {
            return penztargepService.RemovePenztargep(id);
        }

        [HttpGet("loaddata")]
        public void LoadData()
        {
            penztargepService.LoadData();
        }

        [HttpGet("loadfelulvizsgalatok")]
        public void LoadFelulvizsgalatok()
        {
            penztargepService.LoadFelulvizsgalatok();
        }
    }
}
