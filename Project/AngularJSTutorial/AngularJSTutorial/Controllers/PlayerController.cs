using AngularJSTutorial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJSTutorial.Controllers
{
    public class PlayerController : Controller
    {
        private ApplicationDbContext _context = null;
        public PlayerController()
        {
            _context = new ApplicationDbContext();
        }
        // GET: Player
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetPlayers()
        {
            List<Player> listPlayers = _context.Players.ToList();
            return Json(new { list = listPlayers }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPlayerById(int id)
        {
            Player player = _context.Players.Where(x=>x.PlayerId == id).SingleOrDefault();
            return Json(new { player = player }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPlayer(Player player)
        {
            _context.Players.Add(player);
            _context.SaveChanges();
            return Json(new { status = "Player Added Successfully" });
        }

        public JsonResult UpdatePlayer(Player player)
        {
            _context.Entry(player).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();
            return Json(new { status = "Player Updated Successfully" });
        }

        public JsonResult DeletePlayer(int id)
        {
            Player player = _context.Players.Where(x => x.PlayerId == id).SingleOrDefault();
            _context.Players.Remove(player);
            _context.SaveChanges();
            return Json(new { status = "Player Deleted Successfully" });
        }
    }
}